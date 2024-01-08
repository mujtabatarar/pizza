const express = require('express');
const router = express.Router();
const { 
  login, updatePassword, forgetPassword, verifyTwoFactor, sendOtp, verifyOtp
} = require('../controllers/Admin');

// unprotedted routes
router.post("/login", login);
router.post('/update-password', updatePassword);
router.post('/forget-password', forgetPassword);
router.post("/verify-two-factor", verifyTwoFactor);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);


module.exports = router;