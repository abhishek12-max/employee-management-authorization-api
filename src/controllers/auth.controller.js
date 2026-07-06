const Usermodel= require("../models/user.model");
const {validationResult}= require("express-validator");

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

    const user= await Usermodel.create({
          fullname,
          username,
          email,
          password
    });
    res.status(200).json({
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

module.exports= {
    register
}