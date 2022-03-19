module.exports = {
  port: process.env.PORT,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  SMS_SERVICE: process.env.SMS_SERVICE,
  redis: {
    url: process.env.REDIS_URL
  }
};
