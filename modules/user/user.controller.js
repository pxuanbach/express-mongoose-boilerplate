const service = require('./user.service');
const { BaseQuery, BaseParam } = require('../base/base.dto');
const { UserCreateBody, UserUpdateBody, UserResponse } = require('./user.dto');

async function getUsersHandler(req, res, next) {
  try {
    const { error, value: query } = BaseQuery.validate(req.query);
    if (error)
      return res.status(422).json({ message: error.details[0].message });

    const { count, users } = await service.getUsers(query.search, query.page, query.size);

    return res.status(200).json({
      total: count,
      page: query.page,
      size: query.size,
      data: users,
    });
  } catch (error) {
    return next(error);
  }
}

async function createUsersHandler(req, res, next) {
  try {
    const { error, value: payload } = UserCreateBody.validate(req.body);
    if (error)
      return res.status(422).json({ message: error.details[0].message });

    const user = await service.createUser(
      payload.fullName,
      payload.username,
      payload.password,
      payload.isActive
    );

    return res.status(201).json(user);
  } catch (error) {
    if (error.errorResponse.code === 11000) {
      return res.status(409).json({
        message: error.errorResponse.errmsg,
      });
    }
    return next(error);
  }
}

async function getUserByIdHandler(req, res, next) {
  try {
    const {
      error,
      value: { id },
    } = BaseParam.validate(req.params);
    if (error)
      return res.status(422).json({ message: error.details[0].message });

    const user = await service.getUserById(id, true);
    if (!user) return res.status(404).json({ message: 'User not found!' });

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

async function updateUsersHandler(req, res, next) {
  try {
    const {
      paramErr,
      value: { id },
    } = BaseParam.validate(req.params);
    if (paramErr)
      return res.status(422).json({ message: paramErr.details[0].message });

    const { bodyErr, value: payload } = UserUpdateBody.validate(req.body);
    if (bodyErr)
      return res.status(422).json({ message: bodyErr.details[0].message });

    const user = await service.getUserById(id);
    if (!user) return res.status(404).json({ message: 'User not found!' });

    const updatedUser = await service.updateUser(
      id,
      payload.fullName,
      payload.email,
      payload.gender,
      payload.country,
      payload.lastLogin,
    );

    return res.status(200).json(UserResponse.validate(updatedUser));
  } catch (error) {
    return next(error);
  }
}

async function deleteUsersHandler(req, res, next) {
  try {
    const {
      error,
      value: { id },
    } = BaseParam.validate(req.params);
    if (error)
      return res.status(422).json({ message: error.details[0].message });

    const user = await service.getUserById(id, true);
    if (!user) return res.status(404).json({ message: 'User not found!' });

    await service.deleteUser(id);

    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getUsersHandler,
  createUsersHandler,
  getUserByIdHandler,
  updateUsersHandler,
  deleteUsersHandler,
};
