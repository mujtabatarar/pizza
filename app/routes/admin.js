const express = require('express');
const router = express.Router();
const { 
  getAdmins, 
  createAdmin, 
  status, 
  deleteAdmin, 
  forgetPassword, 
  updatePassword, 
  verifyTwoFactor,
  updateTwoFactorStatus
} = require('../controllers/Admin');
const { authenticate } = require("../controllers/Utils");
const { createRole, updateRole, deleteRole, roleFindOne, roleFindAll, permissionsFindAll } = require('../controllers/Role');
const { createSetting, getAllSettings, getSettingById, getSettingByName, updateSettingById, deleteSettingById } = require('../controllers/Setting');

// admin login

// router.post("/login", login);
// router.post("/verify-two-factor", verifyTwoFactor);

router.use("/update-two-factor-status", authenticate)
router.post("/update-two-factor-status", updateTwoFactorStatus);
router.get('/admin-list', getAdmins);
router.post('/create-admin', createAdmin);
router.patch('/active-admin', status);
router.post('/delete/:id', deleteAdmin);

// router.post('/forget-password', forgetPassword);
// router.post('/update-password', updatePassword);

//roles
router.post('/create-role', createRole);
router.patch('/update-role', updateRole);
router.delete('/delete-role/:id', deleteRole);
router.get('/findone-role/:code', roleFindOne);
router.get('/findAll-role', roleFindAll);

//permissions
router.get('/findAll-permissions', permissionsFindAll);


//settings
router.post('/create-setting', createSetting);
router.get('/get-all-settings', getAllSettings);
router.get('/get-setting-by-id/:id', getSettingById);
router.get('/get-setting-by-name/:name', getSettingByName);
router.patch('/update-setting/:id', updateSettingById);
router.delete('/delete-setting/:id', deleteSettingById);





module.exports = router;