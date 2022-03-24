const config = require("config");
const REDIS_URL = config.get("redis.url");

const Bull = require("bull");
const emailQueue = new Bull("Email", { redis: REDIS_URL });
const mail = require("../../service/email.service");

emailQueue.process("reset", async (job) => {
  const { data } = job;
  resp = await mail.code_reset_mail(data.to, data.subject, data.token);
  console.log(resp, "fimla")
});

emailQueue.process("verify", async (job) => {
  await mail.verify_email();
});

emailQueue.process("welcome", async (job) => {
  await mail.welcome_mail();
});

emailQueue.process("vendor", async (job) => {
  await mail.vendor_status_mail();
});

module.exports = class EmailQueue {
  static async verifyMail(data) {
    await emailQueue.add("verify", data, { attempts: 5 });
  }
  static async resetMail(data) {
    await emailQueue.add("reset", data, { attempts: 5 });
  }
  static async welcomeMail(data) {
    await emailQueue.add("welcome", data, { attempts: 5 });
  }
  static async vendorStatusMail(data) {
    await emailQueue.add("vendor", data, { attempts: 5 });
  }
};
