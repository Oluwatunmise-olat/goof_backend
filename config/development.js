module.exports = {
  db: {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD
  },
  mail: {
    host: "smtp.mailtrap.io",
    port: process.env.MAILTRAP_PORT,
    user: process.env.MAILTRAP_USER,
    password: process.env.MAILTRAP_PASSWORD
  }
};
