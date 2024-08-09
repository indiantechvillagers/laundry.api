const Joi = require("joi");

const createBannerSchema = Joi.object({
  bannerName: Joi.string().required(true),
  image: Joi.string().required(true),
  bannerStatus: Joi.boolean().default(false),
  serial: Joi.number().allow(null),
  isActive: Joi.boolean().default(true),
  isDeleted: Joi.boolean().default(false),
});
const updateBannerSchema = Joi.object({
  bannerName: Joi.string(),
  image: Joi.string(),
  bannerStatus: Joi.boolean(),
  serial: Joi.number().allow(null),
  isActive: Joi.boolean(),
});
module.exports = {
  createBannerSchema,
  updateBannerSchema,
};
