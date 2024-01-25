const express = require('express');
const router = express.Router();
const { 
  login, updatePassword, forgetPassword, verifyTwoFactor, sendOtp, verifyOtp
} = require('../controllers/Admin');
const products = require("../controllers/Products/Products")



// unprotedted routes
router.post("/login", login);
router.post('/update-password', updatePassword);
router.post('/forget-password', forgetPassword);
router.post("/verify-two-factor", verifyTwoFactor);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

router.get("/cart", products.cart.get);
router.post("/cart", products.cart.create);
router.put("/cart", products.cart.update);
router.delete("/cart", products.cart.delete);



module.exports = router;