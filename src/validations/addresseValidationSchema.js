const Joi = require("joi");

const createAddresseSchema = Joi.object({
  setDefault: Joi.boolean().default(false),
  name: Joi.string(),
  phone: Joi.string().required(),
  email: Joi.string().email(),
  addressType: Joi.string().required(),
  address: Joi.string().required(),
  landMark: Joi.string().required(),
  pin: Joi.string().required(),
  // userId: Joi.number().required(),
  isActive: Joi.boolean().default(true),
  isDeleted: Joi.boolean().default(false),
});

const updateAddresseSchema = Joi.object({
  setDefault: Joi.boolean(),
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string().email(),
  addressType: Joi.string(),
  address: Joi.string(),
  landMark: Joi.string(),
  pin: Joi.string(),
  isActive: Joi.boolean(),
});

module.exports = {
  createAddresseSchema,
  updateAddresseSchema,
};
