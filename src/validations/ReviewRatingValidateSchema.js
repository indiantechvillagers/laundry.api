const Joi = require('joi');

const createSchema = Joi.object({
    reviews: Joi.string().required(),
    ratings: Joi.number().required(),
    // addedBy: Joi.number().required(),    
    isApproved: Joi.boolean().default(false),
    isActive: Joi.boolean().default(true),
    isDeleted: Joi.boolean().default(false),
    productId: Joi.number()
});

const updateSchema = Joi.object({
    reviews: Joi.string(),
    ratings: Joi.number(),
    isActive: Joi.boolean()
});

module.exports = {
    createSchema,
    updateSchema
};