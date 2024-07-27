const AppError = require('../utils/appError');
const cloudinary = require('../configs/cloudinary');

const filterUnnecessaryFieldsAndAddImage = async (req, res, next) => {
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.profilePic = result.secure_url;
    } catch (err) {
      return next(new AppError(500, 'Something went wrong in saving Image'));
    }
  }

  const { email, username, profilePic, bio, firebaseToken } = req.body;
  req.body = {
    email,
    username,
    profilePic,
    bio,
    firebaseToken,
  };
  next();
};

module.exports = filterUnnecessaryFieldsAndAddImage;
