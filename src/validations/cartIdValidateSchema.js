const Joi = require('joi');

const createSchema = Joi.object({
    isOrderCompleted: Joi.boolean().default(false),
    // userId: Joi.number().required(),
    isActive: Joi.boolean().default(true),
    isDeleted: Joi.boolean().default(false)
});

const updateSchema = Joi.object({

});


module.exports = {
    createSchema,
    updateSchema,
};