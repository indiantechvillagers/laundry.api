const orderProcessServices = require('../../services/customer/orderProcessService');
const cartValidatedSchema = require('../../validations/cartValidateSchema');
const addresseValidationSchema = require('../../validations/addresseValidationSchema');
const deliveryChargeValidateSchema = require('../../validations/deliveryChargeValidateSchema');
const couponValidateSchema = require('../../validations/couponValidateSchema');
const orderValidateSchema = require('../../validations/orderValidateSchema');

const orderProcessConotroller = {
    getAllCarts: async (req, res) => {
        try {
            // const userId = req.user.userId;
            const userId = req.body.deviceId;
            const data = await orderProcessServices.getAllCarts(userId);
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    editcartitem: async (req, res) => {
        try {
            const { error, value } = cartValidatedSchema.updateSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ status: 400, error: error.details[0].message });
            }
            
            const data = await orderProcessServices.editcartitem(req.params.cartProductId, value);

            // const userId = req.user.userId;
            const userId = req.body.deviceId;
            const cartdata = await orderProcessServices.getAllCarts(userId);

            if (!data) {
                return res.status(404).json({ status: 404, data: cartdata || [] });
            } else {
                return res.status(200).json({ status: 200, data: cartdata || [] });
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    deletecartitem: async (req, res) => {
        try {
            const data = await orderProcessServices.deletecartitem(req.params.cartProductId);

            const userId = req.user.userId;
            const cartdata = await orderProcessServices.getAllCarts(userId);

            return res.status(200).json({ status: 200, data: cartdata || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getslots: async (req, res) => {
        try {
            const data = await orderProcessServices.getAllSlots();
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getdeliverycharge: async (req, res) => {
        try {
            const { error, value } = deliveryChargeValidateSchema.getdeliverychargeSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ status: 400, error: error.details[0].message });
            }

            if (req.user) {
                value.userId = req.user.userId;
            }

            const data = await orderProcessServices.getdeliverycharge(value);
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAllAddress: async (req, res) => {
        try {
            const userId = req.user.userId;
            const data = await orderProcessServices.getAllAddress(userId);
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    addNewAddress: async (req, res) => {

        const { error, value } = addresseValidationSchema.createAddresseSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }

        try {

            value.userId = req.user.userId;
            const data = await orderProcessServices.addNewAddress(value);

            const userId = req.user.userId;
            const address = await orderProcessServices.getAllAddress(userId);

            return res.status(200).json({ status: 200, msg: "New Address Added", data: address || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getapplicablecouponlist: async (req, res) => {
        try {
            // const { error, value } = couponValidateSchema.availabalCouponSchema.validate(req.body);
            // if (error) {
            //     return res.status(400).json({ status: 400, error: error.details[0].message });
            // }

            // value.userId = req.user.userId;

            const data = await orderProcessServices.getapplicablecouponlist({ userId: req.user.userId });
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    applycoupon: async (req, res) => {
        try {
            const { error, value } = couponValidateSchema.applycoupon.validate(req.body);
            if (error) {
                return res.status(400).json({ status: 400, error: error.details[0].message });
            }

            value.userId = req.user.userId;

            const data = await orderProcessServices.applycoupon(value);
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    placeorder: async (req, res) => {
        try {
            const { error, value } = orderValidateSchema.createSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ status: 400, error: error.details[0].message });
            }

            value.userId = req.user.userId;

            const data = await orderProcessServices.placeorder(value, req.get('Host'));
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    }
};

module.exports = orderProcessConotroller;