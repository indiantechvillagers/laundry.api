const Joi = require('joi');

const createSchema = Joi.object({
    refundReason: Joi.string().required(),
    upi: Joi.string().allow(null),
    accountHolderName: Joi.string().allow(null),
    accountNumber: Joi.string().allow(null),
    ifscCode: Joi.string().allow(null),
    transactionId: Joi.number().allow(null),
    // refundStatusId: Joi.number(),
    refundRequestMethodId: Joi.number().required(),
    // adminNote: Joi.string(),
    orderId: Joi.number().required(),
    isActive: Joi.boolean().default(true),
    isDeleted: Joi.boolean().default(false)
});

const updateSchema = Joi.object({
    refundReason: Joi.string(),
});
const changeStatusSchema = Joi.object({
    refundStatusId: Joi.number().required(),
    adminNote: Joi.string().allow(null),
});

module.exports = {
    createSchema,
    updateSchema,
    changeStatusSchema
};