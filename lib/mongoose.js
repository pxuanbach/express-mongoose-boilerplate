const mongoose = require("mongoose");
const config = require('../config');
const logger = require("./winston");


/**
 * Connects to the MongoDB database using the URI and database name specified in the configuration.
 *
 * This function attempts to connect to MongoDB and logs the connection status.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when the connection attempt is complete. The promise does not return any value.
 * @throws {Error} Throws an error if the connection to MongoDB fails. The error will be logged.
 */
async function connectToDatabase() {
  try {
    logger.info("Try to connect to MongoDB URI: " + config.appEnv.MONGODB_URI)
    await mongoose.connect(config.appEnv.MONGODB_URI, {
      dbName: config.appEnv.DB_NAME,
      // maxPoolSize: 100,
      // serverSelectionTimeoutMS: 30000
    });
  } catch (error) {
    logger.error("MongoDB connection error:" + error.message);
    // TODO
  }
}

mongoose.connection.on('connected', () => {
  logger.info('MongoDB connection established');
  // TODO
});

mongoose.connection.on('reconnected', () => {
  logger.info('MongoDB connection reestablished');
  // TODO
});

mongoose.connection.on('disconnected', () => {
  logger.info('MongoDB connection disconnected');
  // TODO
});

mongoose.connection.on('close', () => {
  logger.info('MongoDB connection closed');
  // TODO
});

mongoose.connection.on('error', (error) => {
  logger.error('MongoDB ERROR: ' + error);
  // TODO
});

module.exports = { connectToDatabase };
