const Usermodel= require("../models/user.model");
const {validationResult}= require("express-validator");
const bcrypt= require("bcrypt");
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
         res.status(200).json({
            message:"login successfull"
         })
    } catch (error) {
        next(error)
    }
}

module.exports= {
    register,
    login
}