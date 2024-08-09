const Joi = require("joi");

const createOrderStatusMasterSchema = Joi.object({
  statusName: Joi.string().required(),
  serial: Joi.number(),
  isActive: Joi.boolean().default(true),
  isDeleted: Joi.boolean().default(false),
});

const updateOrderStatusMasterSchema = Joi.object({
  statusName: Joi.string(),
  serial: Joi.number(),
  isActive: Joi.boolean()
});

module.exports = {
  createOrderStatusMasterSchema,
  updateOrderStatusMasterSchema,
};
