const joi = require('joi');
const j2s = require('joi-to-swagger');
const config = require('../../config');

//#region ---------- Path Parameter ----------
const BaseParam = joi.object().keys({
  id: joi.string().hex().length(24).required(), // objectid
});
//#endregion

//#region ---------- Query Parameter ----------
const BaseQuery = joi.object().keys({
  search: joi.string().default('').optional(),
  page: joi.number().integer().default(config.appEnv.DEFAULT_PAGE).optional(),
  size: joi
    .number()
    .integer()
    .max(1000)
    .default(config.appEnv.DEFAULT_SIZE)
    .optional(),
});
const { swagger: BaseQuerySwagger } = j2s(BaseQuery);
//#endregion

//#region ---------- Body ----------
//#endregion

//#region ---------- Response ----------
const BasePagiResponse = joi.object().keys({
  total: joi.number().integer().default(1),
  page: joi.number().integer().default(config.appEnv.DEFAULT_PAGE),
  size: joi.number().integer().default(config.appEnv.DEFAULT_SIZE),
  data: joi.array(),
});
const { swagger: BasePagiResponseSwagger } = j2s(BasePagiResponse);

const BaseMessageResponse = joi.object().keys({
  message: joi.string().default('Success'),
});
const { swagger: BaseMessageResponseSwagger } = j2s(BaseMessageResponse);
//#endregion

//#region ---------- Exports ----------
module.exports = {
  BaseParam,

  BaseQuery,
  BaseQuerySwagger,

  BasePagiResponse,
  BasePagiResponseSwagger,
  BaseMessageResponse,
  BaseMessageResponseSwagger,
};
//#endregion
