const Joi = require('joi');

const createSchema = Joi.object({
    notificationTitle: Joi.string().required(),
    notificationMessage: Joi.string().required(),
    notificationType: Joi.string().allow(null),
    notificationFor: Joi.string().allow(null),
    isRead: Joi.boolean().default(false),
    expiryDate: Joi.date(),
    priority: Joi.number().allow(null),
    isActive: Joi.boolean().default(true),
    isDeleted: Joi.boolean().default(false)
});

const updateSchema = Joi.object({
    isRead: Joi.boolean(),
});

module.exports = {
    createSchema,
    updateSchema
};