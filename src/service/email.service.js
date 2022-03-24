// Handles everything related to sending of email

// mailtrap is used for development
// <not sure yet> is used for production

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

    await this._send({ to, subject, html: msg });
  }

  async _send(opts) {
    const FROM = process.env.COMPANY_EMAIL;
    const transporter = await this.__createTransport();
    transporter.verify((error, resp) => {
      if (error) {
        console.log(error);
      } else {
        console.log(resp);
      }
    });
    return await transporter.sendMail({ ...opts, from: FROM });
  }

  async __createTransport() {
    if (
      process.env.NODE_ENV == "test" ||
      process.env.NODE_ENV == "development"
    ) {
      const port = config.get("mail.port");
      const host = config.get("mail.host");
      const user = config.get("mail.user");
      const password = config.get("mail.password");

      const transporter = await createTransport({
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
      // use a diff service
    }
  }
}

module.exports = new EmailService();
