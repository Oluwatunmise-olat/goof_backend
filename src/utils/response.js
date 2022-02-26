module.exports = (status = true, msg = "", data = {}, errorData = {}) => {
  return { status, msg, data, errorData };
};
