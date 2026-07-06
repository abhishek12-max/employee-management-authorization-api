const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        minLength:3,
        maxLength:20,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    role:{
        type:String,
        enum:["admin","manager","employee"],
        default:"employee",
        required:true
    }
});

const Usermodel = mongoose.model("user",userSchema);

module.exports= Usermodel;