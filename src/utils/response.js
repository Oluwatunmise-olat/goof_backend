module.exports = ({ status, msg, data, errorData }) => {
  status = status == undefined ? true : status;
  msg = msg == undefined ? "" : msg;
  data = data == undefined ? {} : data;
  errorData = errorData == undefined ? [] : errorData;
  return { status, msg, data, errorData };
};
