const Usermodel= require("../models/user.model");
const {validationResult}= require("express-validator");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
const register= async (req,res,next) => {
     try {
          const error= validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({
            error: error.array()
        })
    }

    const{fullname,username,email,password}= req.body;

    const existingUser= await Usermodel.findOne({
        $or:[{username},{email}]
    });

    if(existingUser){
         return res.status(400).json({
            message:"all ready register"
         })
    }
    const hashpassword= await bcrypt.hash(password,10);

    const user= await Usermodel.create({
          fullname,
          username,
          email,
          password:hashpassword
    });
    res.status(201).json({
        message:"user register successfull",
        user:{
            fullname:user.fullname,
            username:user.username,
            email:user.email
        }
    });
} catch (error) {
         next(error);
 }
  
}

const login= async (req,res,next) => {
    try {
        const error= validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({
                error: error.array()
            })
        }

        const {password,email}= req.body
         
        const existingUser= await Usermodel.findOne({
            email
        })
         if(!existingUser){
            return res.status(400).json({
                message:"invalid email or password"
            })
         }

         const ismatch= await bcrypt.compare(password,existingUser.password);
         if(!ismatch){
             return res.status(400).json({
                message:"invalid password or email"
             })
         }
         const token = jwt.sign({id:existingUser._id,role:existingUser.role},process.env.JWT_SECRET);
         res.cookie("token",token)
         res.status(201).json({
            message:"login successfull",
         })
    } catch (error) {
        next(error)
    }
}

  const logout= async (req,res) => {
      res.clearCookie("token")
      res.status(201).json({
        message:"logout sucessfull"
      })
  }

  const getprofile= async (req,res) => {
       try{
          return res.status(200).json({
            message:"employee profile",
            employee:req.user
          })
       }catch(error) {
          return res.status(500).json({
              message:"something went worng"
          })
      }
        
    }

module.exports= {
    register,
    login,
    logout,
    getprofile
}