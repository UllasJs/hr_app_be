const express = require("express");
const router = express.Router();
const AuthenticateToken = require("../middleware");
const EmpController = require('../controller/empController');

router.post("/add-employ", AuthenticateToken, EmpController.AddEmploy);
router.get("/get-employ-list", AuthenticateToken, EmpController.getEmployList)
router.get("/get-employ-list/:emp_id", AuthenticateToken, EmpController.getEmployDetails)

module.exports = router;
