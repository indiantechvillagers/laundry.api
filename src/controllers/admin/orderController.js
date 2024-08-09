
const orderService = require('../../services/admin/orderService');
const orderValidatedSchema = require('../../validations/orderValidateSchema');

const orderController = {
    getslots: async (req, res) => {
        try {
            const data = await orderService.getAllSlots();
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    add: async (req, res) => {
        const { error, value } = orderValidatedSchema.createSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }

        try {
            const data = await orderService.add(value);

            return res.status(200).json({ status: 200, msg: " Order added" });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const data = await orderService.getAll();
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    filterorder: async (req, res) => {
        try {
            const data = await orderService.filterorder(req.params.orderStatusId);
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAllOrder: async (req, res) => {
        try {
            const data = await orderService.getAllOrder();
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { error, value } = orderValidatedSchema.updateSchema.validate(req.body);

            const data = await orderService.update(req.params.orderId, value);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    updateorderstatus: async (req, res) => {
        try {
            const { error, value } = orderValidatedSchema.updateorderstatusSchema.validate(req.body);
            value.userId = req.user.userId;

            const data = await orderService.updateorderstatus(req.params.orderId, value, req.get('Host'));
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    updatepaymentstatus: async (req, res) => {
        try {
            const { error, value } = orderValidatedSchema.updatePaymentStatusSchema.validate(req.body);

            const data = await orderService.updatepaymentstatus(req.params.orderId, value);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const data = await orderService.delete(req.params.orderId);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    get: async (req, res) => {
        try {
            const data = await orderService.get(req.params.orderId);
            return res.status(200).json({ status: 200, data: data || {} });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getLebel: async (req, res) => {
        try {
            const data = await orderService.getLebel(req.params.orderId);
            return res.status(200).json({ status: 200, data: data || {} });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getSpecificOrder: async (req, res) => {
        try {
            const data = await orderService.getSpecificOrder(req.params.orderId);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    }
}

module.exports = orderController;
