const app = require('./app');
const { logger, connectToDatabase } = require('./lib');
const config = require("./config");

app.listen(config.appEnv.PORT, async () => {
  logger.info(`express app running in port ${config.appEnv.PORT}`);
  await connectToDatabase();
});
