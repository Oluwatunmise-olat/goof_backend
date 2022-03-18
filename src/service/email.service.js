// Handles everything related to sending of email

// mailtrap is used for development
// mailgun is used for production

const { createTransport } = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");
const config = require("config");
const logger = require("../../logger/log");

module.exports = class EmailService {
  
  constructor () {
    this.transporter = this.__createTransport();

  }

  static welcome_mail() {}

  static verify_email() {}

  static code_reset_mail(to, subject, token) {
    this._send({
      to,
      subject,
      html: `
        <h1>Hello, testing. This reset your email <a href=${token}>reset password</a></h1>
      `
    });
  }

  static vendor_waiting_status_mail() {}

  _send(opts) {
    /**
     * @params opts: {
     *  to: "",
     *  subject: "",
     *  msg: "",
     * }
     */
    this.transporter.sendMail({ ...opts, from: process.env.COMPANY_EMAIL });
  }

  __verifyTransporter(transporter) {
    return transporter.verify(error, (success) => {
      if (error) return [false, error];
      return [true, null];
    });
  }

  __createTransport() {
    if (
      process.env.NODE_ENV == "test" ||
      process.env.NODE_ENV == "development"
      ) {
      logger.info("called")
      const port = config.get("mail.port");
      const host = config.get("mail.host");
      const user = config.get("mail.user");
      const password = config.get("mail.password");

      const transporter = createTransport({
        host,
        port,
        auth: {
          user,
          pass: password
        }
      });


      const [status, msg] = this.__verifyTransporter(transporter);
      if (!status) {
        logger.error(`Error with mail transporter [service/email]: ${msg}`);
      }
      return transporter;
    }

    if (process.env.NODE_ENV == "production") {
      const api_key = config.get("mail.api_key");
      const domain = config.get("mail.domain");

      const transporter = createTransport(
        mailgun({ auth: { api_key, domain } })
      );

      const [status, msg] = this.__verifyTransporter(transporter);
      if (!status) {
        logger.error(`Error with mail transporter [service/email]: ${msg}`);
      }
      return transporter;
    }
  }
};
