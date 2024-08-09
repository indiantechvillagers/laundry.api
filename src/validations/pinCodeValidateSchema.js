const Joi = require('joi');

const createSchema = Joi.object({
    pincode: Joi.string().required(),
    isActive: Joi.boolean().default(true),
    isDeleted: Joi.boolean().default(false)
});

const updateSchema = Joi.object({
    pincode: Joi.string(),
    isActive: Joi.boolean()
});

const validateSchema = Joi.object({
    pincode: Joi.string().required()
});

module.exports = {
    createSchema,
    updateSchema,
    validateSchema
};