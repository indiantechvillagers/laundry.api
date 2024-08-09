const Joi = require('joi');

const createSchema = Joi.object({
    day: Joi.string().required(),
    time: Joi.string().required(),
    slotLimit: Joi.number().required(),
    isActive: Joi.boolean().default(true),
    isDeleted: Joi.boolean().default(false)
});

const updateSchema = Joi.object({
    day: Joi.string(),
    time: Joi.string(),
    slotLimit: Joi.number(),
    isActive: Joi.boolean()
});

module.exports = {
    createSchema,
    updateSchema
};