exports.extractAuth = (headers) => {
  if (!(Object.keys(headers).includes("authorization"))) return [false, []];
  const authArr = headers["authorization"].split(" ");
  return [true, authArr];
};
