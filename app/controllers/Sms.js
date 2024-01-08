// const db = require("../models");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const { errorHandler } = require("./errHandler");
// // const adminSession = require('../models/AdminSession');
// const role = db.role;

// exports.sendSmsUnifonic = async (smsObject) => {
//     try {

//       const apiUrl = `${appConfig().unifonicApiUrl}${
//         appConfig().unifonicSendSmsEndpoint
//       }`;
//       const authCredentials = `${appConfig().unifonicUsername}:${
//         appConfig().unifonicPassword
//       }`;
//       const authToken = Buffer.from(authCredentials).toString('base64');
//       const apiHeaders = {
//         Authorization: `Basic ${authToken}`,
//       };

//       const apiParams = {
//         AppSid: process.env.unifonicAppSid,
//         SenderID: appConfig().unifonicSenderId,
//         Body: params.message,
//         Recipient: `${params.mobileNo}`,
//         responseType: 'JSON',
//         statusCallbacl: 'sent',
//       };

//       // this.logger.log(`[sendSms] -> Unifonic ApiHeader: ${JSON.stringify(apiHeaders)}`);
//       this.logger.debug(
//         `[sendSms] -> Unifonic Request: ${JSON.stringify(apiParams)}`,
//       );
//       this.logger.log(`[sendSms] -> Unifonic ApiUrl: ${apiUrl}`);

//       if (appConfig().mode == 'dev')
//         return ResponseHandler.success({ message: 'dev mode' });
//       let apiRes;
//       try {
//         apiRes = await axios.post(apiUrl, apiParams);
//       } catch (err) {
//         this.logger.error(`Unifonic api failed ${err?.message}`);
//         return this.sendSmsTwilio(params);
//       } finally {
//         // Code that will always execute, regardless of whether an exception was thrown or not
//         console.log('sendSmsTwilio failed');
//       }

//       this.logger.log(
//         `[sendSms] -> Unifonic Api response: ${JSON.stringify(apiRes?.data)}`,
//       );
//       if (apiRes?.data?.success === true)
//         return ResponseHandler.success(apiRes.data);
//       else {
//         this.logger.error('[sendSms] Error Response message:');
//         this.logger.error('[sendSms] Error Response:');
//         return ResponseHandler.error(
//           HttpStatus.BAD_REQUEST,
//           errorMessage.SOMETHING_WENT_WRONG,
//         );
//       }
//     } catch (err) {
//       this.logger.error(`[sendSms] -> Error in catch: ${err.message}`);

//       if (axios.isAxiosError(err)) {
//         this.logger.error(
//           `[sendSms] -> Error in catch | Unifonic API message: ${JSON.stringify(
//             err.response,
//           )}`,
//         );

//         return ResponseHandler.error(
//           err.response?.status || HttpStatus.BAD_REQUEST,
//           err.response?.data?.message || errorMessage.SOMETHING_WENT_WRONG,
//         );
//       }
//       return ResponseHandler.error(
//         HttpStatus.BAD_REQUEST,
//         err?.message || errorMessage.SOMETHING_WENT_WRONG,
//       );
//     }
//   }

exports.sendSmsTwilio = async (params) => {
        try {
      console.log(`[sendSmsTwilio] params -> ${params}`);
      const client = await require('twilio')(
        process.env.accountSidTwilio,
        process.env.authTokenTwilio,
      );
      client.messages
        .create({
          body: params?.message,
          from: `${process.env.twilioPhoneNo}`,
          to: `+${params?.mobileNo}`,
        })
        .then((message) => console.log(message.sid));
        res.status(201).json({message: "success"});
      } catch (err) {
      console.log(`sendSmsTwilio catch error -> ${err?.message}`);
      return ResponseHandler.error(err.message);
    }
  }