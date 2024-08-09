const taxMasterService = require('../../services/admin/taxMasterService');
const taxMasterValidateSchema = require('../../validations/taxMasterValidateSchema');

const taxMasterController = {
    add: async (req, res) => {
        const { error, value } = taxMasterValidateSchema.createSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }

        try {
            const data = await taxMasterService.add(value);

            return res.status(200).json({ status: 200, msg: "Tax added" });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const data = await taxMasterService.getAll();
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { error, value } = taxMasterValidateSchema.updateSchema.validate(req.body);

            const data = await taxMasterService.update(req.params.taxMasterId, value);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const data = await taxMasterService.delete(req.params.taxMasterId);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    get: async (req, res) => {
        try {
            const data = await taxMasterService.get(req.params.taxMasterId);
            return res.status(200).json({ status: 200, data: data || {} });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    }
}


module.exports = taxMasterController;