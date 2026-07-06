const express= require("express");

const router= express.Router();
const {registervalidationresult}= require("../validators/user.validatior");
const authcontroller= require("../controllers/auth.controller");



router.post("/register",registervalidationresult,authcontroller.register);



module.exports= router;