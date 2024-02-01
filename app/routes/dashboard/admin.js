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
} = require('../../controllers/Admin/Admin');
const { authenticate } = require("../../controllers/Other/Utils");
const { createRole, updateRole, deleteRole, roleFindOne, roleFindAll, permissionsFindAll } = require('../../controllers/Admin/Role');
const { createSetting, getAllSettings, getSettingById, getSettingByName, updateSettingById, deleteSettingById, getAllTimmings, deleteTimmingById, getTimmingByDay, getTimmingDetails, updateTimmingById, getTimmingById, createTiming } = require('../../controllers/Admin/Setting');
const products = require("../../controllers/Products/Products")
const { getAllMessages, getMessageById, deleteMesssageById } = require('../../controllers/Admin/Message');

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


//Promo
router.post("/promo", products.promo.create);
router.put("/promo", products.promo.update);
router.delete("/promo", products.promo.delete);
router.get("/promos/usage", products.promo.getAllPromoCodeWithUsageBasicDetails);
router.get("/promo/usages", products.promo.getParticularPromoFullUsageDetais);
router.get("/promo", products.promo.getParticularPromoFullUsageDetais);

//Messages
router.get('/get-all-message', getAllMessages);
router.get('/get-single-message/:id', getMessageById);
router.delete('/delete-single-message/:id', deleteMesssageById);

//timming
router.post('/timming', createTiming);
router.get('/timming', getAllTimmings),
router.get('/timming/get-one-by-day/:day', getTimmingByDay);
router.get('/timming/get-one-by-id/:id', getTimmingById);
router.patch('/timming/:id', updateTimmingById);
router.delete('/timming/:id', deleteTimmingById);

module.exports = router;