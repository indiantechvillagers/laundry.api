const serviceListingServices = require('../../services/customer/serviceListingServices');
const cartValidatedSchema = require('../../validations/cartValidateSchema');
const cartIdValidatedSchema = require('../../validations/cartIdValidateSchema');
const orderProcessServices = require('../../services/customer/orderProcessService');

const serviceListingConotroller = {
    getAllProduct: async (req, res) => {
        try {
            let subCategoryId = req.params.subCategoryId;
            const data = await serviceListingServices.getAllProduct(subCategoryId);
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getCartId: async (req, res) => {
        const { error, value } = cartIdValidatedSchema.createSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }
        value.userId = req.user.userId;
        try {
            const data = await serviceListingServices.getCartId(value);
            console.log(data)
            return res.status(200).json({ status: 200, msg: "CartId", data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    addToCart: async (req, res) => {
        const { error, value } = cartValidatedSchema.createSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }

        try {
            // value.userId = req.user.userId || null;

            let paramObj = {};

            console.log(req.user.userId);

            if (req.user.userId) {
                paramObj.userId = req.user.userId;
                value.userId = req.user.userId;
            }

            value.deviceId = req.body.deviceId ? req.body.deviceId : null;

            const data = await serviceListingServices.addToCart(value);

            const userId = req.body.deviceId;
            const carts = await orderProcessServices.getAllCarts(userId);

            return res.status(200).json({ status: 200, msg: data, data: carts || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
}

module.exports = serviceListingConotroller;