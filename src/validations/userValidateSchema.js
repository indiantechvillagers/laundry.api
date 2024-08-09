const Joi = require('joi');

const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    phone: Joi.string(),
    dob: Joi.string(),
    gender: Joi.string(),
    roleId: Joi.number().required(),
    isActive: Joi.boolean().default(true),
    isDeleted: Joi.boolean().default(false)
});

const updateUserSchema = Joi.object({
    name: Joi.string(),
    phone: Joi.string(),
    dob: Joi.string(),
    gender: Joi.string(),
    isActive: Joi.boolean(),
    roleId: Joi.number()
});


module.exports = {
    createUserSchema,
    updateUserSchema
};