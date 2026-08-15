const errorHandlers = (err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      status: "not success",
      message: "invalid json",
    });
  }
  return res.status(500).json({
    status: "not success",
    message: "Internal server error",
  });
};
export default errorHandlers;
