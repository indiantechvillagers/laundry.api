const Joi = require('joi');

const createSchema = Joi.object({
    deliveryChargeAmount: Joi.number().required(),
    minOrderAmount: Joi.number(),
    maxOrderAmount: Joi.number(),
    deliveryChargeAmount: Joi.number().required(),
    pinCode: Joi.string().allow(null),
    deliveryChargeTypeId: Joi.number().required(),
    isActive: Joi.boolean().default(true),
    isDeleted: Joi.boolean().default(false)
});

const updateSchema = Joi.object({
    deliveryChargeAmount: Joi.number(),
    minOrderAmount: Joi.number(),
    maxOrderAmount: Joi.number(),
    pinCode: Joi.string(),
    isActive: Joi.boolean()
});
const getdeliverychargeSchema = Joi.object({
    // cartId: Joi.number(),
    pinCode: Joi.string()
});

module.exports = {
    createSchema,
    updateSchema,
    getdeliverychargeSchema
};