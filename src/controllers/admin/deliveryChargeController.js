const deliveryChargeService = require('../../services/admin/deliveryChargeService');
const deliveryChargeValidateSchema = require('../../validations/deliveryChargeValidateSchema');


const deliveryChargeController = {
    add: async (req, res) => {
        const { error, value } = deliveryChargeValidateSchema.createSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }

        try {
            const data = await deliveryChargeService.add(value);

            return res.status(200).json({ status: 200, msg: "Delivery charge data added" });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const data = await deliveryChargeService.getAll();
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { error, value } = deliveryChargeValidateSchema.updateSchema.validate(req.body);

            const data = await deliveryChargeService.update(req.params.deliveryChargeId, value);

            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const data = await deliveryChargeService.delete(req.params.deliveryChargeId);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    get: async (req, res) => {
        try {
            const data = await deliveryChargeService.get(req.params.deliveryChargeId);
            return res.status(200).json({ status: 200, data: data || {} });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    }
}

module.exports = deliveryChargeController;