exports.extractMessage = (arr) => {
  // helper function to extract express-validator error
  return arr.map((obj) => {
    return { msg: obj.msg };
  });
};

exports.errMsg = (fieldname) => {
  // helpeer function to set express-validator error message
  return `${fieldname} is required`;
};
