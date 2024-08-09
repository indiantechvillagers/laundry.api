
const cartService = require('../../services/admin/cartService');
const cartValidatedSchema = require('../../validations/cartValidateSchema');


const cartController = {
    add: async (req, res) => {
        const { error, value } = cartValidatedSchema.createSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }

        try {
            value.userId = req.user.userId;

            const data = await cartService.add(value);

            return res.status(200).json({ status: 200, msg: "Product added in cart." });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const data = await cartService.getAll();
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { error, value } = cartValidatedSchema.updateSchema.validate(req.body);

            const data = await cartService.update(req.params.cartProductId, value);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const data = await cartService.delete(req.params.cartProductId);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    get: async (req, res) => {
        try {
            const data = await cartService.get(req.params.cartProductId);
            return res.status(200).json({ status: 200, data: data || {} });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    }
}

module.exports = cartController;
