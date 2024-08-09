
const couponTypeMasterService = require('../../services/admin/couponTypeMasterService');
const couponTypeMasterValidateSchema = require('../../validations/couponTypeMasterValidateSchema');

const couponTypeMasterController = {
    add: async (req, res) => {
        const { error, value } = couponTypeMasterValidateSchema.createSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }

        try {
            const data = await couponTypeMasterService.add(value);
            return res.status(200).json({ status: 200, msg: "Coupon Type Added" });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const data = await couponTypeMasterService.getAll();
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAlldd: async (req, res) => {
        try {
            const data = await couponTypeMasterService.getAlldd();
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { error, value } = couponTypeMasterValidateSchema.updateSchema.validate(req.body);

            const data = await couponTypeMasterService.update(req.params.couponTypeId, value);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const data = await couponTypeMasterService.delete(req.params.couponTypeId);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    get: async (req, res) => {
        try {
            const data = await couponTypeMasterService.get(req.params.couponTypeId);
            return res.status(200).json({ status: 200, data: data || {} });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    }
}

module.exports = couponTypeMasterController;
