const User = require('./user.model');
const config = require('../../config');
const { hashText } = require('../../lib');
const { normalizeEmail } = require('../../utils/emailUtils');

/**
 * Get list users
 *
 * @async
 * @param {string} search
 * @param {number} [page=config.appEnv.DEFAULT_PAGE]
 * @param {number} [size=config.appEnv.DEFAULT_SIZE]
 * @returns {Promise<{ count: number, users: User[]}>}
 */
async function getUsers(
  search,
  page = config.appEnv.DEFAULT_PAGE,
  size = config.appEnv.DEFAULT_SIZE
) {
  const filters = {
    $or: [
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ],
  };

  const count = await User.where(filters).countDocuments();
  const users = await User.find(filters, null, {
    skip: (page - 1) * size,
    limit: size,
  }).select(...User.excludeFields);

  return { count, users };
}

/**
 * Create user
 *
 * @async
 * @param {string} fullName
 * @param {string} username
 * @param {string} password
 * @param {bool} isActive
 * @returns {Promise<User>}
 */
async function createUser(fullName, username, password, isActive) {
  const hashedPassword = await hashText(password);
  const normalizedEmail = normalizeEmail(username);

  const user = await User.create({
    fullName,
    username: normalizedEmail, // normalize email
    email: username, // raw email
    hashedPassword,
    isActive,
  });

  return user;
}


/**
 * Description placeholder
 *
 * @async
 * @param {string} id - The unique identifier of the user to be updated.
 * @param {boolean} [isExclude=false]
 * @returns {Promise<User>}
 */
async function getUserById(id, isExclude = false) {
  let promise = User.findById(id);
  if (isExclude === true) {
    promise = promise.select(User.excludeFields)
  }
  const user = await promise;
  return user;
}

/**
 * Get user by username
 *
 * @async
 * @param {string} username
 * @returns {Promise<User>}
 */
async function getUserByUsername(username) {
  const user = await User.findOne({ username });
  return user;
}

/**
 * Update user (partial)
 *
 * @async
 * @param {string} id - The unique identifier of the user to be updated.
 * @param {string} fullName - The full name of the user. Optional.
 * @param {string} email - The email address of the user. Optional.
 * @param {string} gender - The gender of the user. Optional.
 * @param {string} country - The country of the user. Optional.
 * @param {Date} lastLogin - The last login date of the user. Optional.
 * @returns {Promise<User>}
 */
async function updateUser(id, fullName, email, gender, country, lastLogin) {
  const payload = {};
  if (fullName) payload['fullName'] = fullName;
  if (email) payload['email'] = email;
  if (gender) payload['gender'] = gender;
  if (country) payload['country'] = country;
  if (lastLogin) payload['lastLogin'] = lastLogin;

  const user = await User.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true } // return updated document
  );
  return user;
}


/**
 * Delete user
 *
 * @async
 * @param {string} id - The unique identifier of the user to be updated.
 * @returns {Promise<void>}
 */
async function deleteUser(id) {
  return await User.deleteOne({ _id: id });
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser
};
