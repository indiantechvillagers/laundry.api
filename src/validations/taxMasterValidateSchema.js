const Joi = require('joi');

const createSchema = Joi.object({
    taxName: Joi.string().required(),
    amount: Joi.number().required(),
    isActive: Joi.boolean().default(true),
    isDeleted: Joi.boolean().default(false),
    isApplied:Joi.boolean().default(true)
});
const updateSchema = Joi.object({
    taxName: Joi.string(),
    amount: Joi.number()

});

module.exports = {
    createSchema,
    updateSchema
}


