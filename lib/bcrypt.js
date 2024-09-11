const bcrypt = require('bcrypt');


/**
 * Hashes a given text using bcrypt with a specified number of rounds.
 *
 * @async
 * @param {string} text - The text to hash. It should be a string.
 * @param {number} [rounds=10] - The number of rounds to use for hashing. Defaults to 10.
 * @returns {Promise<string>}
 * @throws {Error}
 */
async function hashText(text, rounds = 10) {
  const hashedText = await new Promise((resolve, reject) => {
    bcrypt.hash(text, rounds, (err, hash) => {
      if (err) reject(err)
      resolve(hash)
    });
  });

  return hashedText;
}

module.exports = {
  hashText
}
