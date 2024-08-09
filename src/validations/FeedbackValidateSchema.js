const Joi = require('joi');

const createSchema = Joi.object({
    feedbackNotes: Joi.string().required(),
    isApproved: Joi.boolean().default(false),
    productId: Joi.number().allow(null),
    isActive: Joi.boolean().default(true),
    isDeleted: Joi.boolean().default(false)
});

const updateSchema = Joi.object({
    feedbackNotes: Joi.string(),
    isApproved: Joi.boolean(),
    isActive: Joi.boolean()
});

module.exports = {
    createSchema,
    updateSchema
};