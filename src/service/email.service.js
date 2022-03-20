// Handles everything related to sending of email

// mailtrap is used for development
// mailgun is used for production

const { createTransport } = require("nodemailer");
const config = require("config");
const logger = require("../../logger/log");

class EmailService {
  async welcome_mail() {}

  async verify_email() {}

  async code_reset_mail(to, subject, token) {
    const msg = `
    <p>
      You made a request to reset your goof account password.

      <p>This pin expires in <b>10 minutes</b>
      <p>Your reset pin is ${token} to proceed</p>

      <b>Note:</b> If you didn't initiate this request kindly ignore.
    </p>
  `;

    await this._send({
      to,
      subject,
      html: msg
    });
  }

  async vendor_status_mail() {}

  async _send(opts) {
    /**
     * @params opts: {to: "",  subject: "",msg: ""}
     */

    const FROM = process.env.COMPANY_EMAIL;

    const transporter = this.__createTransport();
    if (process.env.NODE_ENV != "production") {
      return await transporter.sendMail({
        ...opts,
        from: FROM
      });
    }

    return await transporter.messages().send({
      ...opts,
      from: FROM
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

      var mailgun = require("mailgun-js")({
        apiKey: api_key,
        domain
      });

      return mailgun;
    }
  }
}

module.exports = new EmailService();
