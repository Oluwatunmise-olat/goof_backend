// Handles everything related to sending of email

// mailtrap is used for development
// mailgun is used for production

const { createTransport } = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");
const config = require("config");

class EmailService {
  transporter = this.__createTransport();

  static welcome_mail() {}

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
      process.env.NODE_ENV == "developemnt"
    ) {
      const port = config.get("port");
      const host = config.get("host");
      const user = config.get("mail.user");
      const password = config.get("mail.password");

      const transporter = new createTransport({
        host,
        port,
        auth: {
          user,
          pass: password
        }
      });

      const [status, msg] = this.__verifyTransporter(transporter);
      if (status) {
        return transporter;
      }
      // log error
    }

    if (process.env.NODE_ENV == "production") {
    }
  }
}
