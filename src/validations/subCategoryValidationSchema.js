const Joi = require('joi');

const createSchema = Joi.object({
    subCategoryName: Joi.string().required(),
    serial: Joi.number(),
    subCategoryImage: Joi.string(),
    thumbnailImage: Joi.string(),
    isActive: Joi.boolean().default(true),
    isDeleted: Joi.boolean().default(false),
    categoryId: Joi.number().required()
});

const updateSchema = Joi.object({
    categoryName: Joi.string(),
    serial: Joi.number(),
    categoryImage: Joi.string(),
    thumbnailImage: Joi.string(),
    isActive: Joi.boolean(),
    categoryId: Joi.number().required()
});

module.exports = {
    createSchema,
    updateSchema
};