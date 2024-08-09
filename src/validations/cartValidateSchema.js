const Joi = require('joi');

const createSchema = Joi.object({
    productId: Joi.number().required(),
    // pricePerQantity: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
    // totalPrice: Joi.number().required(),
    deviceId: Joi.string().required(),
    isActive: Joi.boolean().default(true),
    isDeleted: Joi.boolean().default(false),
    isOrderCompleted: Joi.boolean().default(false)
});

const updateSchema = Joi.object({
    // pricePerQantity: Joi.number(),
    quantity: Joi.number(),
    deviceId: Joi.string(),
    // totalPrice: Joi.number(),
    // isActive: Joi.boolean().default(true),
    // isDeleted: Joi.boolean().default(false)
});

// const quantityValidateSchema = Joi.object({
//     qantity: Joi.number(),
//     isActive: Joi.boolean().default(true),
//     isDeleted: Joi.boolean().default(false)
// });

module.exports = {
    createSchema,
    updateSchema,
    // quantityValidateSchema
};