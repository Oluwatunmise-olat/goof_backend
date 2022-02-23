let { User } = require("../models/index");

exports.signupHandler =async (req, res, next) => {
  // validate user input
  // validate email
  // validate phone_number
  // verify phone number
  // perform signup
  // send email

  // TODO:: PERMISSION TABLE
  let resp = await User.create({
    id: 5,
    firstname: "shola",
    lastname: "allyson",
    email: "soh@gmail.com",
    phone_number: "2347043164390",
    password: "q2eudy7ghbd 1bqji9087yutghjncqm"
  });
  console.log(resp);
  return res.sendStatus(200);
};
