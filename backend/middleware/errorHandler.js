// backend/middleware/errorHandler.js

module.exports = (err, req, res, next) => {
  console.error("Error:", err);

  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Internal Server Error",
    // optional: include stack trace only in development
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
