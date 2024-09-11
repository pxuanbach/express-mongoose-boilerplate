require('@dotenvx/dotenvx').config()

module.exports = {
  appEnv: {
    TZ: process.env.TZ || "Asia/Ho_Chi_Minh",
    PORT: process.env.PORT || "3001",
    NODE_ENV: process.env.NODE_ENV || "development",
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://root:example@127.0.0.1:27017",
    DB_NAME: process.env.DB_NAME || "tinyin",
    DEFAULT_PAGE: parseInt(process.env.DEFAULT_PAGE, 10) || 1,
    DEFAULT_SIZE: parseInt(process.env.DEFAULT_SIZE, 10) || 20
  },
  auth: {
    SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS, 10) || 10,
    SECRET_KEY: process.env.SECRET_KEY,
  }
}
