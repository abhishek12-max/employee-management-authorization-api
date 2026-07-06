const express= require("express");
const authMiddleware = require("../middleware/auth.middleware");
const authorizedRole = require("../middleware/authorizedroles.middleware");
const admincontroller= require("../controllers/admin.controller");
const router= express.Router();

router.get("/dashboard",authMiddleware,authorizedRole("admin"),admincontroller.getdashboard);

module.exports= router;