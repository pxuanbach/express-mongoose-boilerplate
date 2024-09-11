const joi = require('joi');
const j2s = require('joi-to-swagger');
const { SocialEnum, GenderEnum } = require('./user.enum');
const config = require('../../config');

//#region ---------- Path Parameter ----------
//#endregion

//#region ---------- Query Parameter ----------
//#endregion

//#region ---------- Body ----------
const UserCreateBody = joi.object().keys({
  fullName: joi.string().optional(),
  username: joi.string().email().required(),
  password: joi.string().min(8).max(32).required(),
  isActive: joi.boolean().default(false),
});
const { swagger: UserCreateBodySwagger } = j2s(UserCreateBody);

const UserUpdateBody = joi.object().keys({
  fullName: joi.string().optional(),
  email: joi.string().email().optional(),
  gender: joi.string().valid(...Object.values(GenderEnum)).optional(),
  country: joi.string().optional(),
  lastLogin: joi.date().optional(),
});
const { swagger: UserUpdateBodySwagger } = j2s(UserUpdateBody);
//#endregion

//#region ---------- Response ----------
const UserResponse = UserUpdateBody.append({
  _id: joi.string().required(),
  username: joi.string().email().required(),
  isActive: joi.boolean().default(false),
  isStaff: joi.boolean().default(false),
  isSuperuser: joi.boolean().default(false),
  features: joi
    .array()
    .items(
      joi.object().keys({
        featureId: joi.string().optional(),
      })
    )
    .optional(),
  socialProfiles: joi
    .array()
    .items(
      joi.object().keys({
        social: joi.string().valid(...Object.values(SocialEnum)),
        email: joi.string(),
        socialId: joi.string(),
      })
    )
    .optional(),
  inAppConfig: joi
    .object()
    .keys({
      registeredDeviceToken: joi.string().optional(),
    })
    .optional(),
  updatedAt: joi.date(),
  createdAt: joi.date(),
});
const { swagger: UserResponseSwagger } = j2s(UserResponse);

const UserListResponse = joi.array().items(UserResponse);
const { swagger: UserListResponseSwagger } = j2s(UserListResponse);
//#endregion

//#region ---------- Exports ----------
module.exports = {
  UserCreateBody,
  UserCreateBodySwagger,
  UserUpdateBody,
  UserUpdateBodySwagger,

  UserResponse,
  UserResponseSwagger,
  UserListResponse,
  UserListResponseSwagger
};
//#endregion
