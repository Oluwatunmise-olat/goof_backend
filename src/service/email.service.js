// Handles everything related to sending of email

// mailtrap is used for development
// mailgun is used for production

const { createTransport } = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");
const config = require("config");
const logger = require("../../logger/log");

class EmailService {
  async welcome_mail() {}

  async verify_email() {}

  async code_reset_mail(to, subject, token) {
    await this._send({
      to,
      subject,
      html: `
        <p>
          You made a request to reset your goof account password.

          <p>This pin expires in <b>10 minutes</b>
          <p>Your reset pin is ${token}> to proceed</p>

          <b>Note:</b> If you didn't initiate this request kindly ignore.
        </p>
      `
    });
  }

  async vendor_status_mail() {}

  async _send(opts) {
    /**
     * @params opts: {to: "",  subject: "",msg: ""}
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
}

module.exports = new EmailService();
