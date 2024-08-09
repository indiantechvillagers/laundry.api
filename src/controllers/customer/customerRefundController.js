
const refundMasterService = require('../../services/customer/customerRefundService');
const refundMasterValidatedSchema = require('../../validations/refundMasterValidateSchema');


const refundMasterController = {
    add: async (req, res) => {
        const { error, value } = refundMasterValidatedSchema.createSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }

        try {
            value.userId = req.user.userId;
            const data = await refundMasterService.add(value);
            const list = await refundMasterService.getAll(req.user.userId);
            return res.status(200).json({ status: 200, msg: "Refund added", data: list });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const data = await refundMasterService.getAll(req.user.userId);
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { error, value } = refundMasterValidatedSchema.updateSchema.validate(req.body);

            const data = await refundMasterService.update(req.params.refundId, value);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const data = await refundMasterService.delete(req.params.refundId);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    get: async (req, res) => {
        try {
            const data = await refundMasterService.get(req.params.refundId);
            return res.status(200).json({ status: 200, data: data || {} });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    }
}

module.exports = refundMasterController;
