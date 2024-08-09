const Joi = require('joi');

const createSchema = Joi.object({
    categoryName: Joi.string().required(),
    serial: Joi.number().allow(null),
    categoryImage: Joi.string().allow(null),
    isActive: Joi.boolean().default(true),
    isDeleted: Joi.boolean().default(false)
});

const updateSchema = Joi.object({
    categoryName: Joi.string(),
    serial: Joi.number().allow(null),
    categoryImage: Joi.string(),
    isActive: Joi.boolean()
});

module.exports = {
    createSchema,
    updateSchema
};