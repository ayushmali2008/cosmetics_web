const errorMiddleware = (err, req, res, next) => {
  console.error("ERROR:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // MongoDB invalid ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID";
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;

    const errors = Object.values(err.errors).map((error) => error.message);

    return res.status(statusCode).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    statusCode = 409;

    const field = Object.keys(err.keyValue)[0];

    message = `${field} already exists`;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorMiddleware;