const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");
const asyncHandler = require("../middleware/async");

// @desc    Register User
// @routes  POST /api/v1/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //* Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  //* Create Token
  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token,
  });
});

// @desc    Login User
// @routes  POST /api/v1/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //* Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and Password", 400));
  }

  //* Check for user
  const user =  await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  //* Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  //* Create Token
  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token,
  });
});