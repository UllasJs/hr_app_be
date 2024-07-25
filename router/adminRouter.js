const express = require("express");
const router = express.Router();
const AuthenticateToken = require("../middleware");
const adminController = require("../controller/adminController");

router.post("/add-admin", adminController.add_admin);
router.post("/login", adminController.login);
router.post("/check-login", adminController.checkLogin);
router.get("/get-users", AuthenticateToken, adminController.get_users);

module.exports = router;
