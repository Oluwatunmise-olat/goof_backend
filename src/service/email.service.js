// Handles everything related to sending of email

// mailtrap is used for development
// mailgun is used for production

const { createTransport } = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");
const config = require("config");
const logger = require("../../logger/log");

module.exports = class EmailService {
  static welcome_mail() {}

  static verify_email() {}

  async code_reset_mail(to, subject, token) {
    console.log(this);
    await this._send({
      to,
      subject,
      html: `
        <h1>Hello, testing. This reset your email ${token}reset password</h1>
      `
    });
  }

  static vendor_waiting_status_mail() {}

  async _send(opts) {
    /**
     * @params opts: {
     *  to: "",
     *  subject: "",
     *  msg: "",
     * }
     */
    const transporter = this.__createTransport();
    return await transporter.sendMail({
      ...opts,
      from: process.env.COMPANY_EMAIL
    });
  }

  __createTransport() {
    if (
      process.env.NODE_ENV == "test" ||
      process.env.NODE_ENV == "development"
    ) {
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

      return transporter;
    }

    if (process.env.NODE_ENV == "production") {
      const api_key = config.get("mail.api_key");
      const domain = config.get("mail.domain");

      const transporter = createTransport(
        mailgun({ auth: { api_key, domain } })
      );

      return transporter;
    }
  }
};
