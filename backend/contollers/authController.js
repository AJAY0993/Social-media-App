const { promisify } = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const genToken = require('../utils/genToken');
const sendEmail = require('../configs/email');

const genTokenandSendRes = (user, res) => {
  const token = genToken(user._id);
  const expiryDate = new Date(Date.now() + 60 * 60 * 1000 * 24 * 30); // 30d
  res.cookie('jwt', token, {
    // secure: false,
    expires: expiryDate,
  });

  res
    .status(201)
    .cookie('jwt', token, {
      secure: process.env.NODE_ENV === 'production',
      expires: expiryDate,
    })
    .json({
      status: 'success',
      message: 'Account created successfully',
      data: {
        user,
        token,
      },
    });
};

const signUp = catchAsync(async (req, res, next) => {
  // Check If Fields are not empty
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    next(new AppError(400, 'Please provide required field'));
  }

  if (password !== confirmPassword) {
    return next(new AppError(400, 'Passwords do not match'));
  }

  const user = await User.findOne({ email });
  if (user) throw new AppError(400, 'Email already exist');

  const profilePic = `https://avatar.iran.liara.run/public/?username=${username}`;
  const newUser = await User.create({
    username,
    email,
    password,
    confirmPassword,
    profilePic,
  });

  newUser.password = undefined;
  genTokenandSendRes(newUser, res);
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new AppError(401, 'Please provide email and password'));
  }
  // Check if user exist
  const user = await User.findOne({ email }).select('+password');
  // Check if password is correct
  if (!user || !(await user.isPasswordCorrect(password, user.password))) {
    return next(new AppError(401, 'Incorrect email or password'));
  }

  user.password = undefined;
  genTokenandSendRes(user, res);
});

const isAuthenticated = catchAsync(async (req, res, next) => {
  const { jwt: jwtToken } = req.cookies;
  if (!jwtToken) {
    return next(new AppError(400, 'You are not logged in. Please Log in!'));
  }

  // Check if token is valid
  const decoded = await promisify(jwt.verify)(jwtToken, process.env.JWT_SECRET);
  // Check if user still exist
  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError(400, 'Account does not exist anymore'));

  // Check if password user changed recently
  const hasPasswordChanged = user.passwordChangedRecently(decoded.iat);

  if (hasPasswordChanged) {
    return next(
      new AppError(400, 'Password changed recently. Please log in again!')
    );
  }
  req.user = {
    ...decoded,
    profilePic: user.profilePic,
    username: user.username,
    likedPosts: user.likedPosts,
  };
  next();
});

const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next(new AppError(400, 'Please provide email'));

  const user = await User.findOne({ email });
  if (!user) return next(new AppError(400, 'Invalid email'));

  // Send Email
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/resetPassword/${resetToken}`;
  try {
    await sendEmail(user.email, resetUrl, user);
    res.status(200).json({
      status: 'success',
      message: 'Password reset link with instructions sent to your email',
      data: {
        resetToken,
      },
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpiry = undefined;
    await user.save({ validateBeforeSave: false });

    next(new AppError(500, 'Failed to send email please try again later'));
  }
});

const resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpiry: { $gt: Date.now() },
  });
  let c = 0;
  console.log(++c);
  if (!user) return next(new AppError(400, 'Token expired or Invalid token'));
  console.log(++c);
  if (password !== confirmPassword) {
    return next(new AppError(400, 'Passwords do not match'));
  }
  console.log(++c);
  user.password = password;
  user.confirmPassword = confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpiry = undefined;
  await user.save();
  genTokenandSendRes(user, res);
});

module.exports = {
  signUp,
  login,
  isAuthenticated,
  forgotPassword,
  resetPassword,
};
