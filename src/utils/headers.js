exports.extractAuth = (headers) => {
  const authArr = headers["authorization"].split(" ");
  return authArr;
};
