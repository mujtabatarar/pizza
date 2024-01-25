const db = require("../models");
const setting = db.setting;

exports.createSetting = async (req, res) => {
  try {
    console.log('setting');
    console.log(req.body);
    const setting = await db.setting.create(req.body);
    console.log('Setting created:', setting.toJSON());
    res.status(200).send({ success: true, data: setting });
  } catch (error) {
    console.error('Error creating setting:', error.message);
    res.status(500).send({ error: error.message });
  }
};

exports.getAllSettings = async (req, res) => {
  try {
    const settings = await setting.findAll();
    console.log('All settings:', settings.map((setting) => setting.toJSON()));
    res.status(200).send({ success: true, data: settings });
  } catch (error) {
    console.error('Error getting settings:', error.message);
    res.status(500).send({ error: error.message });
  }
};

exports.getSettingById = async (req, res) => {
  try {
    console.log(req?.params?.name);
    const settings = await setting.findByPk(req?.params?.id);
    console.log(settings.name);
    if (settings) {
      console.log('Setting by ID:', settings.toJSON());
      res.status(200).send({ success: true, data: settings });
    } else {
      console.log('Setting not found');
      res.status(400).send({ error: error.message });
    }
  } catch (error) {
    console.error('Error getting setting by ID:', error.message);
    res.status(500).send({ error: error.message });
  }
};

exports.getSettingByName = async (req, res) => {
  try {
    const settings = await setting.findOne({
      where: { name: req?.params?.name },
    });

    if (settings) {
      console.log('Setting by name:', settings.toJSON());
      res.status(200).send({ success: true, data: settings });
    } else {
      console.log('Setting not found');
      res.status(400).send({ error: "no data found" });
    }
  } catch (error) {
    console.error('Error getting setting by name:', error.message);
    res.status(500).send({ error: error.message });
  }
};

exports.getSettingByNameInternal = async (settingName) => {
  try {
    const settings = await setting.findOne({
      where: { name: settingName },
    });

    if (settings) {
      console.log('Setting by name:', settings.toJSON());
      return settings;
    } else {
      console.log('Setting not found');
      return settings;
    }
  } catch (error) {
    console.error('Error getting setting by name:', error.message);
    return null;  }
};

exports.updateSettingById = async (req, res) => {
  try {
    const settings = await setting.findByPk(req?.params?.id);
    if (settings) {
      const updatedSetting = await settings.update(req?.body);
      console.log('Setting updated:', updatedSetting.toJSON());
      res.status(200).send({ success: true, data: updatedSetting });
    } else {
      console.log('Setting not found');
      res.status(400).send({ error: "Setting not found" });
    }
  } catch (error) {
    console.error('Error updating setting:', error.message);
    res.status(500).send({ error: error.message });
  }
};

exports.deleteSettingById = async (req, res) => {
  try {
    const settings = await setting.findByPk(req?.params?.id);
    if (setting) {
      await settings.destroy();
      console.log('Setting deleted');
      res.status(200).send({ success: true });
    } else {
      res.status(400).send({ error: "Setting not found" });
    }
  } catch (error) {
    console.error('Error deleting setting:', error.message);
    res.status(500).send({ error: error.message });
  }
};

//for all timming.
exports.getTimmingDetails = async (req, res) => {
  try {
    
    const settings = await setting.findOne({
      where: { name: req?.params?.name },
    });

    if (settings) {
      console.log('Setting by name:', settings.toJSON());
      res.status(200).send({ success: true, data: settings });
    } else {
      console.log('Setting not found');
      res.status(400).send({ error: "no data found" });
    }
  } catch (error) {
    console.error('Error getting setting by name:', error.message);
    res.status(500).send({ error: error.message });
  }
};



