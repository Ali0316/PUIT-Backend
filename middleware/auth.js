const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // const { token } = req.cookies;

  const token = req.header('Authorization').replace('Bearer ', '');
  if (token) {
    try {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedData.id);
    } catch (err) {
      console.log("Token verification error: ", err.message);
    }
  }
  next();
});
exports.isAdminUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
