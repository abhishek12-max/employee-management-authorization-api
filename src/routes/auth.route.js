const express= require("express");

const router= express.Router();
const {registervalidationresult,loginvalidationresult}= require("../validators/user.validatior");
const authcontroller= require("../controllers/auth.controller");



router.post("/register",registervalidationresult,authcontroller.register);
router.post("/login",loginvalidationresult,authcontroller.login);


module.exports= router;