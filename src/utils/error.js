exports.extractMessage = (arr) => {
  return arr.map((obj) => {
    return { msg: obj.msg };
  });
};
