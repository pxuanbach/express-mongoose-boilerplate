const { app, swaggerUi, swaggerOutputFile } = require('./lib');
const subApp = require('./modules');
const swaggerDocument = require(swaggerOutputFile);

app.use('/api/v1', subApp);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
