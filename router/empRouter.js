const express = require("express");
const router = express.Router();
const AuthenticateToken = require("../middleware");
const EmpController = require('../controller/empController');

router.post("/add-employ", EmpController.AddEmploy);

module.exports = router;
