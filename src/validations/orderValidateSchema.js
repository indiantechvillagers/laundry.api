const Joi = require('joi');

const createSchema = Joi.object({
    // pickUpSlot: Joi.string().required(),
    // deliverySlot: Joi.string(),
    slotId: Joi.number().required(),
    totalPrice: Joi.number().required(),
    deliveryCharge: Joi.number().required(),
    totalPayableAmount: Joi.number().required(),
    orderStatusId: Joi.number().default(1),
    couponApplied: Joi.string().allow(null),
    couponDiscountAmount: Joi.number().allow(null),
    // cartId: Joi.number().required(),
    paymentTypeId: Joi.number().required(),
    addressId: Joi.number().required(),
    transactionId: Joi.number().allow(null),
    isOrderCompleted: Joi.boolean().default(false),
    isActive: Joi.boolean().default(true),
    isDeleted: Joi.boolean().default(false),
    paymentStatus: Joi.string(),
    sgst: Joi.number().default(0),
    cgst: Joi.number().default(0),
    gst: Joi.number().default(0)
});

const updateorderstatusSchema = Joi.object({
    orderStatusId: Joi.number().required(),
    notes: Joi.string(),
});
const updatePaymentStatusSchema = Joi.object({
    paymentStatus: Joi.string()
});
const updateSchema = Joi.object({

});

module.exports = {
    createSchema,
    updateSchema,
    updateorderstatusSchema,
    updatePaymentStatusSchema
};