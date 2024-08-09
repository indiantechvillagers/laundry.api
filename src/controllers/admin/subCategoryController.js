const subCategoryService = require('../../services/admin/subCategoryService');
const subCategoryValidationSchema = require('../../validations/subCategoryValidationSchema');

const subCategoryController = {
    add: async (req, res) => {
        const { error, value } = subCategoryValidationSchema.createSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }

        try {
            const data = await subCategoryService.add(value);

            return res.status(200).json({ status: 200, msg: "Subcategory added" });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const data = await subCategoryService.getAll();
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAlldd: async (req, res) => {
        try {
            const data = await subCategoryService.getAlldd();
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { error, value } = subCategoryValidationSchema.updateSchema.validate(req.body);

            const data = await subCategoryService.update(req.params.subCategoryId, value);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const data = await subCategoryService.delete(req.params.subCategoryId);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    get: async (req, res) => {
        try {
            const data = await subCategoryService.get(req.params.subCategoryId);
            return res.status(200).json({ status: 200, data: data || {} });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    }
};

module.exports = subCategoryController;