const { validationResult } = require("express-validator");
const Usermodel= require("../models/user.model");

const getdashboard= async (req,res,next) => {
    try { 
        const totalemployee = await Usermodel.countDocuments({
            role:"employee"
        });

        const totalmanager=await Usermodel.countDocuments({
            role:"manager"
        });

        const totaladmin= await Usermodel.countDocuments({
            role:"admin"
        })
        res.status(200).json({
            "totalemployee": totalemployee,
            "totalmanager": totalmanager,
            "totaladmin":totaladmin
        })
    } catch (error) {
        next(error)
    }
   
}


const getmanager= async (req,res,next) => {
    try {
        const manager=  await Usermodel.find({
            role:"manager"
        }).select("-password")

        if(manager.length===0){
            return res.status(404).json({
                message:"no manager found"
            })
        }
        res.status(200).json({
            message:"manager fetch successfull",
            manager
        })
    } catch (error) {
        next(error)
    }
}

const createmanager= async (req,res,next) => {
    try {
        const error= validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({
                error:error.array()
            })
        }
     
        const{username,fullname,email,password}=req.body;
        const existingmanager= await Usermodel.findOne({
            $or:[{username},{email}]
        })
         
        if(existingmanager){
            return res.status(400).json({
                message:"already register"
            })
        }
     const hashedpassword= await bcrypt.hash(password,10);
        const manager= await Usermodel.create({
            fullname,
            username,
            email,
            password:hashedpassword,
            role:"manager"
        })
       res.status(200).json({
        message:"manager craeted successfully",
        manager:{
             fullname:manager.fullname,
             username:manager.username,
             email:manager.email,
             role:manager.role
        }
       })
    } catch (error) {
        next(error)
    }
}

const deletemanager= async (req,res,next) => {
    try {
        const id= req.params.id;
        const manager=  await Usermodel.findOne({
            _id:id,
            role:"manager"
        })

         if(!manager){
            return res.status(400).json({
                message:"not found"
            })
         }
         await  Usermodel.findByIdAndDelete(id)
            res.status(200).json({
                message:"successfull deleted"
            })
    } catch (error) {
        next(error)
    }
}

const updatemanager= async (req,res,next) => {
    try {
        const id= req.params.id
        const{fullname,username,email}= req.body
        const existingmanager= await Usermodel.findOne({
            _id:id,
            role:"manager"
        }) 
        if(!existingmanager){
            return res.status(404).json({
                message:"not found"
            })
        }
     const updatemanager =   await Usermodel.findByIdAndUpdate(id,{
            fullname,
            username,
            email
        },{
            new:true
        });
        res.status(200).json({
            message:"manager updated successfully",
            updatemanager:{
                fullname: updatemanager.fullname,
                username:updatemanager.username,
                email:updatemanager.email,
                role:updatemanager.role
            }
        })
    } catch (error) {
        next(error)
    }
}
module.exports={
    getdashboard,
    getmanager,
    createmanager,
    deletemanager,
    updatemanager
}