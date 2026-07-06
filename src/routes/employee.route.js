const express= require("express");
const authMiddleware = require("../middleware/auth.middleware");
const authorizedRole = require("../middleware/authorizedroles.middleware");
const employeecontroller= require("../controllers/employee.controller");
const {registervalidationresult}= require("../validators/user.validatior");

const router= express.Router();

router.get("/employee",authMiddleware,authorizedRole("admin","manager"),employeecontroller.getemployee)
router.post("/employee",registervalidationresult,authMiddleware,authorizedRole("admin"),employeecontroller.createmployee)
router.put("/employee/:id",authMiddleware,authorizedRole("admin","manager"),employeecontroller.editemployee)
router.delete("/employee/:id",authMiddleware,authorizedRole("admin"),employeecontroller.deleteemployee);
module.exports= router;
