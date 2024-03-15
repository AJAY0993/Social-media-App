const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/sendResponse');

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({ active: true, _id: { $ne: req.user.id } });
  res.status(200).json({
    status: 'success',
    message: 'Users fetched successfully',
    data: {
      users,
    },
  });
});

const getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  res.status(200).json({
    status: 'successfull',
    message: 'Profile fetched successfully',
    data: {
      profile: user,
    },
  });
});

const unFollow = catchAsync(async (req, res, next) => {
  const { unFollowId } = req.params;

  console.log(unFollowId);
  // Ftech the current user
  const p1 = User.findById(req.user.id);

  // Check if candidate exist
  const p2 = User.findById(unFollowId);

  // Resolve both promises
  const [user, userToUnFollow] = await Promise.all([p1, p2]);
  if (!userToUnFollow) return next(new AppError(400, 'No such user exist'));

  // If already following throw new Error

  if (!user.following.some((user) => user.followingId === unFollowId)) {
    return next(new AppError(400, 'You are not following'));
  }

  // Add following to current user
  user.following.pull({
    followingId: userToUnFollow._id,
    profilePic: userToUnFollow.profilePic,
    username: userToUnFollow.username,
  });

  // Add follower to candidate user
  userToUnFollow.followers.pull({
    followerId: req.user.id,
    profilePic: req.user.profilePic,
    username: user.username,
  });

  const promises = Promise.all([
    user.save({ validateBeforeSave: false }),
    userToUnFollow.save({ validateBeforeSave: false }),
  ]);

  await promises;
  sendResponse(res, 201, 'Followed successfully', {
    unFollowed: userToUnFollow,
  });
});

const follow = catchAsync(async (req, res, next) => {
  const { followId } = req.params;

  // Ftech the current user
  const p1 = User.findById(req.user.id);

  // Check if candidate exist
  const p2 = User.findById(followId);

  // Resolve both promises
  const [user, userToFollow] = await Promise.all([p1, p2]);
  if (!userToFollow) return next(new AppError(400, 'No such user exist'));

  // If already following throw new Error

  if (user.following.some((user) => user.followingId === followId)) {
    return next(new AppError(400, 'Already following'));
  }

  // Add following to current user
  user.following.push({
    followingId: userToFollow._id,
    profilePic: userToFollow.profilePic,
    username: userToFollow.username,
  });

  // Add follower to candidate user
  userToFollow.followers.push({
    followerId: req.user.id,
    profilePic: req.user.profilePic,
    username: user.username,
  });

  const promises = Promise.all([
    user.save({ validateBeforeSave: false }),
    userToFollow.save({ validateBeforeSave: false }),
  ]);

  await promises;
  sendResponse(res, 201, 'Followed successfully', {
    newFollowing: userToFollow,
  });
});

const getFollowers = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .select('followers')
    .populate('followers');
  sendResponse(res, 200, 'followers fetched sucessfully', {
    followers: user.followers,
  });
});

const getFollowing = catchAsync(async (req, res, next) => {
  const following = await User.findById(req.user.id).select('following');
  sendResponse(res, 200, 'followers fetched sucessfully', { following });
});

module.exports = {
  getProfile,
  getAllUsers,
  getFollowers,
  getFollowing,
  follow,
  unFollow,
};
