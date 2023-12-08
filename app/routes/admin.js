const express = require('express');
const router = express.Router();
const { 
  login, 
  getAdmins, 
  createAdmin, 
  status, 
  deleteAdmin, 
  forgetPassword, 
  updatePassword, 
  verifyTwoFactor,
  updateTwoFactorStatus
} = require('../controllers/Admin');
const { authenticate } = require("../controllers/Utils")

// admin login

router.post("/login", login);
router.post("/verify-two-factor", verifyTwoFactor);

router.use("/update-two-factor-status", authenticate)
router.post("/update-two-factor-status", updateTwoFactorStatus);
router.get('/admin-list', getAdmins);
router.post('/create-admin', createAdmin);
router.post('/active-admin', status);
router.post('/delete/:id', deleteAdmin);

router.post('/forget-password', forgetPassword);
router.post('/update-password', updatePassword);




module.exports = router;