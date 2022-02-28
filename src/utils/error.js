// helper function to extract express-validator error

exports.extractMessage = (arr) => {
  return arr.map((obj) => {
    return { msg: obj.msg };
  });
};
