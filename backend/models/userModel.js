const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const followersSchema = new mongoose.Schema({
  followerId: String,
  profilePic: String,
  username: String,
});

const followingSchema = new mongoose.Schema({
  followingId: String,
  profilePic: String,
  username: String,
});

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
    },
    profilePic: {
      type: String,
    },
    bio: {
      type: String,
    },
    followers: {
      type: [followersSchema],
      default: [],
    },
    following: {
      type: [followingSchema],
      default: [],
    },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    firebaseToken: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'A user must have email'],
      validate: [validator.isEmail, 'Please provide a valid Email address'],
      unique: true,
    },
    password: {
      type: String,
      require: [true, 'Please Provide  a password'],
      validate: {
        validator: (value) => value.length >= 8 && value.length <= 20,
        message: 'Password must be 8 caharcter long and less than 20 chracters',
      },
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please provide confirm password'],
      validate: {
        validator(el) {
          return el === this.password;
        },
        message: 'Password and confirm password are not same',
      },
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpiry: {
      type: Date,
      select: false,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  // if password is not modified return immediately
  if (!this.isModified('password')) return next();

  // else hash the password
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;
  next();
});

UserSchema.pre('save', function (next) {
  // If document is new or Password is not changed return immediately
  if (!this.isModified('password') || this.isNew) return next();

  // Else update password changedAt date
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Check if password is correct
UserSchema.methods.isPasswordCorrect = async (
  plainPassword,
  hashedPassword
) => {
  const result = await bcrypt.compare(plainPassword, hashedPassword);
  return result;
};

// Check if password changed recently
UserSchema.methods.passwordChangedRecently = function (tokenTimeStamp) {
  // Time when password changed(t1) - Time token generated(t2)
  // if(t1 > t2) return true thats is password has changed recently
  const passwordTimeStamp = this.passwordChangedAt || 0;
  if (passwordTimeStamp) {
    return parseInt(passwordTimeStamp.getTime() / 1000, 10) > tokenTimeStamp;
  }
  return false;
};

UserSchema.methods.createPasswordResetToken = function () {
  // Generate resetToken
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Create hash and Set Expiry Date
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpiry = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
