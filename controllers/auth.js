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
