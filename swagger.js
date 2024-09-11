const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
const { glob, Glob } = require('glob');
const path = require('path');
const { swaggerOutputFile, logger } = require('./lib');
const { capitalizeFirstLetter } = require('./utils/stringUtils');
const config = require('./config');

const swaggerOptions = {
  info: {
    title: 'TinYin API',
    description: 'TinYin API Information',
    version: '1.0.0',
  },
  servers: [
    {
      url: `http://localhost:${config.appEnv.PORT}`,
      description: 'Local Environment',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    '@schemas': {},
    parameters: {},
  },
};

const routes = ['./app.js'];
const distDir = './dist';

// create dir if not exist
var fs = require('fs');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

const getParametersFromJoi = (joi2SwaggerSchema, type = 'query') => {
  const { properties, required = [] } = joi2SwaggerSchema;
  const params = [];
  Object.entries(properties).forEach(([name, schema]) => {
    const { description, ...schemaRest } = schema;
    const paramsProps = {};
    if (schemaRest.type === 'object') {
      paramsProps.style = 'deepObject';
    }
    params.push({
      in: type,
      name,
      required: required.includes(name),
      description,
      ...paramsProps,
      schema: schemaRest,
    });
  });
  return params;
};

// automatically import use-case dto from modules
const pattern = './modules/*/*.dto.js';
const files = new Glob(pattern, { realpath: true });

logger.info(`Found ${files.length} dto files`);

for (const file of files) {
  const module = require(path.resolve(file));

  for (const [key, value] of Object.entries(module)) {
    if (key.endsWith('Swagger')) {
      // Get schema name by removing 'Swagger'
      const schemaName = key.substring(0, key.length - 7);

      if (schemaName.endsWith('Query')) {
        const queryParams = getParametersFromJoi(value);
        for (const q of queryParams) {
          const queryName = schemaName + capitalizeFirstLetter(q['name']);
          swaggerOptions['components']['parameters'][queryName] = q;
        }
      }
      if (schemaName.endsWith('Param')) {
        const pathParams = getParametersFromJoi(value, 'path');
        for (const p of pathParams) {
          const pathName = schemaName + capitalizeFirstLetter(p['name']);
          swaggerOptions['components']['parameters'][pathName] = p;
        }
      }
      if (schemaName.endsWith('Response') || schemaName.endsWith('Body')) {
        swaggerOptions['components']['@schemas'][schemaName] = value;
      }
    }
  }
}

swaggerAutogen(swaggerOutputFile, routes, swaggerOptions);
