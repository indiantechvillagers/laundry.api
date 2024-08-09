const Joi = require('joi');

const createSchema = Joi.object({
    couponTypeId: Joi.number().required(),
    couponCode: Joi.string().required(),
    couponDescriptions: Joi.string().allow(null),
    discountType: Joi.string().required(),
    totalUsageLimit: Joi.number().allow(null),
    minOrderAmount: Joi.number().allow(null),
    maxOrderAmount: Joi.number().allow(null),
    discountAmount: Joi.number().required(null),
    isActive: Joi.boolean().default(true),
    isDeleted: Joi.boolean().default(false),
    couponExpiryDate: Joi.date().allow(null)
});

const updateSchema = Joi.object({
    discountType: Joi.string(),
    couponDescriptions: Joi.string(),
    discountAmount: Joi.number(),
    totalUsageLimit: Joi.number().allow(null),
    minOrderAmount: Joi.number().allow(null),
    maxOrderAmount: Joi.number().allow(null),
    isActive: Joi.boolean(),
    couponExpiryDate: Joi.date()
});
const availabalCouponSchema = Joi.object({
    cartId: Joi.number().required()
});
const applycoupon = Joi.object({
    // cartId: Joi.number().required(),
    couponId: Joi.number().required()
});

module.exports = {
    createSchema,
    updateSchema,
    availabalCouponSchema,
    applycoupon
};