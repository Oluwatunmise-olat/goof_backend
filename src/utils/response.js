// helper function for returning Api response to client

module.exports = ({ status, msg, data, errorData, code }) => {
  status = status == undefined ? true : status;
  msg = msg == undefined ? "" : msg;
  data = data == undefined ? {} : data;
  code = code == undefined ? "" : code;
  errorData = errorData == undefined ? [] : errorData;
  return { status, msg, data, errorData, code };
};
