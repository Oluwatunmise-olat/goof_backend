exports.interalServerError = (error, req, res, next) => {
  console.log(error.message)
  return res.status(500).json({
    status: false,
    errorData: [{ msg: "Internal server error" }]
  });
  // log error
};
