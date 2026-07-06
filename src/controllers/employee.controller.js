const { validationResult } = require("express-validator");
const Usermodel= require("../models/user.model");
const bcrypt= require("bcrypt");
const getemployee = async (req,res) => {
    try {
         const employee= await Usermodel.find().select("-password")
          if(!employee){
        return res.status(400).json({
            message:"no data"
        })
    }
    res.status(200).json({
        message:"employee list",
        employee
    })
    
    } catch (error) {
        console.log(error);
    }
   
}

const createmployee= async (req,res,next) => {
    try {
          const error= validationResult(req);
     if(!error.isEmpty()){
        return res.status(400).json({
            error:error.array()
        })
     }

     const {fullname,username,email,password,role}= req.body;
      
     const existingUser=await  Usermodel.findOne({
        $or:[{email},{username}]
     })
        if(existingUser){
            return res.status(400).json({
                 message:"already register"
            })
        }
          if(req.body.role==="admin"){
             return res.status(400).json({
                message:"admin cannot be created by this api"
             })
          }
        const hashedpassword= await bcrypt.hash(password,10);

        const employee= await Usermodel.create({
            fullname,
            username,
            email,
            password:hashedpassword,
            role

        })
        res.status(201).json({
            message:"employee created",
            employee
        })
    } catch (error) {
        next(error)
    }
}

const editemployee= async (req,res) => {
    res.status(200).json({
        message:"edited employee "
    })
}

const deleteemployee= async(req,res)=>{
     res.status(200).json({
        message:"deleted"
     })
}

module.exports={
    getemployee,
    createmployee,
    editemployee,
    deleteemployee
}