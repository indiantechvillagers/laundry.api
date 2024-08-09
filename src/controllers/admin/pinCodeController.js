const pinCodeService = require('../../services/admin/pinCodeService');
const pinCodeValidateSchema = require('../../validations/pinCodeValidateSchema');

const pinCodeController = {
    add: async (req, res) => {
        const { error, value } = pinCodeValidateSchema.createSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }

        try {
            const data = await pinCodeService.add(value);

            return res.status(200).json({ status: 200, msg: "Pincode added" });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const data = await pinCodeService.getAll();
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { error, value } = pinCodeValidateSchema.updateSchema.validate(req.body);

            const data = await pinCodeService.update(req.params.pincodeId, value);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const data = await pinCodeService.delete(req.params.pincodeId);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    get: async (req, res) => {
        try {
            const data = await pinCodeService.get(req.params.pincodeId);
            return res.status(200).json({ status: 200, data: data || {} });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    }
};

module.exports = pinCodeController;