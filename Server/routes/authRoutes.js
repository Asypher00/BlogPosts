const express = require("express");
const {register, login, getProfile} = require("../controllers/auth");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router() ; 

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticateToken, getProfile) ; 

module.exports = router; 