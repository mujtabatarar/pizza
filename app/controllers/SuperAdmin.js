const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// var nodemailer = require("nodemailer");
const { errorHandler } = require("./errHandler");
// const adminSession = require('../models/AdminSession');
const admins = db.admins;


const createToken = async (admin) => {
  try {
    //generate access token
    const token = jwt.sign({ id: admin.id }, process.env.JWT_TOKEN_KEY, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
    //generate refresh token
    const refreshToken = jwt.sign(
      { id: admin.id },
      process.env.JWT_REFRESH_TOKEN_KEY
    );
    return {
      accessToken: token,
      refreshToken: refreshToken,
    };
  } catch (err) {
    console.log("error", err);
    return { error: true };
  }
};

exports.login = async (req, res, next) => {
  try {
    const email = req?.body?.email?.trim?.();
    const password = req?.body?.password?.trim?.();

    if (email && password) {
      let adminData = await admins.findOne({
        where: {
          email: email,
          active: true,
          superAdmin: true
        },
        raw: true,
      });

      if (adminData) {
        let hash = adminData?.password;
        let result = bcrypt.compareSync(password, hash);
        if (result) {
          let tokens = await createToken(adminData);
          if (!tokens?.not_created && !tokens.error) {
            res.status(200).send({
              success:true,
              message:"Login Attempt successful",
              adminId: adminData?.id,
              adminEmail: adminData?.email,
              firstName: adminData?.firstName,
              lastName: adminData?.lastName,
              tokens: tokens,
            });
          } else if (tokens?.not_created) {
            res.send(errorHandler[400])
          } else if (tokens?.error) {
            res.send(errorHandler[503])
          } else {
            res.send(errorHandler[500])
          }
        } else {
          res.send(errorHandler[401])
        }
      } else {
        res.send(errorHandler[404])
      }
    } else {
      res.send(errorHandler[400])
    }
  } catch (err) {
    console.log("error", err);
    res.send(errorHandler["503"])
  }
};