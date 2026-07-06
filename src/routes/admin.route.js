const express= require("express");
const authMiddleware = require("../middleware/auth.middleware");
const authorizedRole = require("../middleware/authorizedroles.middleware");
const admincontroller= require("../controllers/admin.controller");
const { registervalidationresult } = require("../validators/user.validatior");
const router= express.Router();

router.get("/dashboard",authMiddleware,authorizedRole("admin"),admincontroller.getdashboard);
router.get("/manager",authMiddleware,authorizedRole("admin"),admincontroller.getmanager);
router.post("/manager",authMiddleware,authorizedRole("admin"),registervalidationresult,admincontroller.createmanager);
module.exports= router;