// helper functions for handling sending verificaton codes and verification of codes via twilio

const axios = require("axios");
const config = require("config");

const accountSid = config.get("TWILIO_ACCOUNT_SID");
const authToken = config.get("TWILIO_AUTH_TOKEN");
const client = require("twilio")(accountSid, authToken);

const sendCode = async (number) => {
  try {
    let response = await client.verify
      .services(process.env.SMS_SERVICE)
      .verifications.create({ to: number, channel: "sms" });
    return [true, response.status];
  } catch (error) {
    return [false, error];
  }
};

const verifyCode = async (number, code) => {
  try {
    let response = await client.verify
      .services(process.env.SMS_SERVICE)
      .verificationChecks.create({ to: number, code: code });
    return [true, response];
  } catch (error) {
    return [false, "failed"];
  }
};

module.exports = { sendCode, verifyCode };
