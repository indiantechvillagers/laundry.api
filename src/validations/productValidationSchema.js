const Joi = require('joi');

const createSchema = Joi.object({
    productName: Joi.string().required(),
    thumbnailImage: Joi.string().allow(null),
    longDescription: Joi.string().allow(null),
    shortDescription: Joi.string().allow(null),
    price: Joi.number().required(),
    serial: Joi.number(),
    categoryId: Joi.number().required(),
    subCategoryId: Joi.number().required(),
    isActive: Joi.boolean().default(true),
    isDeleted: Joi.boolean().default(false)
});

const updateSchema = Joi.object({
    productName: Joi.string(),
    thumbnailImage: Joi.string(),
    longDescription: Joi.string(),
    shortDescription: Joi.string(),
    price: Joi.number(),
    serial: Joi.number(),
    categoryId: Joi.number(),
    subCategoryId: Joi.number(),
    isActive: Joi.boolean()
});

module.exports = {
    createSchema,
    updateSchema
};