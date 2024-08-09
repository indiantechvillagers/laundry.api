const Joi = require('joi');

const createSchema = Joi.object({
    Name: Joi.string().required(),
    Email: Joi.string().required(),
    Phone: Joi.string().required(),
    Message: Joi.string().required(),
    isActive: Joi.boolean().default(true),
    isDeleted: Joi.boolean().default(false)
});

const updateSchema = Joi.object({

});

module.exports = {
    createSchema,
    updateSchema
};