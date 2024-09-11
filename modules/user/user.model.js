const mongoose = require('mongoose');
const { SocialEnum, GenderEnum } = require('./user.enum');
const { Schema } = mongoose;

const featureNestedSchema = new Schema(
  { _id: false }, // <-- disable `_id`
  {
    featureId: {
      type: String,
    },
  }
);

const socialProfileNestedSchema = new Schema(
  { _id: false }, // <-- disable `_id`
  {
    social: {
      type: String,
      enum: {
        values: Object.values(SocialEnum),
        message: 'Social type {VALUE} is not supported',
      },
    },
    email: {
      type: String,
    },
    socialId: {
      type: String,
    },
  }
);

const inAppConfigNestedSchema = new Schema(
  { _id: false }, // <-- disable `_id`
  {
    registeredDeviceToken: {
      type: String,
    },
  }
);

const userSchema = new Schema(
  {
    fullName: {
      type: String,
    },
    username: {
      // normalize email
      type: String,
      required: [true, 'Username required'],
      min: [8, 'Must be at least 8 characters, got {VALUE}'],
      unique: true,
    },
    email: {
      type: String,
    },
    gender: {
      type: String,
      enum: {
        values: Object.values(GenderEnum),
        message: 'Gender {VALUE} is not supported',
      },
    },
    country: {
      type: String,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    isSuperuser: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    features: [featureNestedSchema],
    socialProfiles: [socialProfileNestedSchema],
    inAppConfig: inAppConfigNestedSchema,
  },
  {
    timestamps: true,
  }
);

userSchema.statics.excludeFields = ["-hashedPassword"]

const User = mongoose.model('User', userSchema);

module.exports = User;
