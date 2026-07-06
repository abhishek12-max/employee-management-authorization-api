const{body}= require("express-validator");

const  registervalidationresult= [
       body("fullname")
        .notEmpty()
        .withMessage("fullname is required"),

       body("username")
       .notEmpty()
       .withMessage("username is required")
       .isLength({min:3,max:20})
       .withMessage("username must be between 3 to 20 charaters"),


       body("email")
           .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email"),

       body("password")
       .notEmpty()
       .withMessage("password is required")
       .isLength({min:6})
       .withMessage("password must be atleast 6 charater")

]

const loginvalidationresult=[
      body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("email is invalid"),
      body("password")
      .notEmpty()
      .withMessage("password is required")
]

module.exports={
    registervalidationresult,
    loginvalidationresult
}
