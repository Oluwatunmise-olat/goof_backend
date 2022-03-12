// helper function for returning Api response to client

module.exports = ({ status, msg, data, errorData, code }) => {
  /**
   * status:
   *  - false (an error occured)
   *  - true (no error occured)
   * data:
   *  - associated response data
   * code:
   *  -  application error codes
   * errorData:
   *  - an array of error if any
   */
  status = status == undefined ? true : status;
  msg = msg == undefined ? "" : msg;
  data = data == undefined ? {} : data;
  code = code == undefined ? "" : code;
  errorData = errorData == undefined ? [] : errorData;
  return { status, msg, data, errorData, code };
};
