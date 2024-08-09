
const deliveryChargeTypeService = require('../../services/admin/deliveryChargeTypeService');
const deliveryChargeTypeValidatedSchema = require('../../validations/deliveryChargeTypeValidateSchema');

const deliveryChargeTypeController = {
    add: async (req, res) => {
        const { error, value } = deliveryChargeTypeValidatedSchema.createSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }

        try {
            const data = await deliveryChargeTypeService.add(value);
            return res.status(200).json({ status: 200, msg: "Delivery Charge Type Added" });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const data = await deliveryChargeTypeService.getAll();
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAlldd: async (req, res) => {
        try {
            const data = await deliveryChargeTypeService.getAlldd();
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { error, value } = deliveryChargeTypeValidatedSchema.updateSchema.validate(req.body);

            const data = await deliveryChargeTypeService.update(req.params.deliveryChargeTypeId, value);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const data = await deliveryChargeTypeService.delete(req.params.deliveryChargeTypeId);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    get: async (req, res) => {
        try {
            const data = await deliveryChargeTypeService.get(req.params.deliveryChargeTypeId);
            return res.status(200).json({ status: 200, data: data || {} });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    }
}

module.exports = deliveryChargeTypeController;
