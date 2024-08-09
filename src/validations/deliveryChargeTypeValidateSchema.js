const Joi = require('joi');

const createSchema = Joi.object({
    deliveryChargeTypeName: Joi.string().required(),
    isActive: Joi.boolean().default(true),
    isDeleted: Joi.boolean().default(false)
});

const updateSchema = Joi.object({
    deliveryChargeTypeName: Joi.string(),
    isActive: Joi.boolean()
});

module.exports = {
    createSchema,
    updateSchema
};