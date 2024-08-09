const categoryService = require('../../services/admin/categoryService');
const categoryValidationSchema = require('../../validations/categoryValidationSchema');

const categoryController = {
    add: async (req, res) => {
        const { error, value } = categoryValidationSchema.createSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }

        try {
            const data = await categoryService.add(value);

            return res.status(200).json({ status: 200, msg: "Category added" });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const data = await categoryService.getAll();
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAlldd: async (req, res) => {
        try {
            const data = await categoryService.getAlldd();
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { error, value } = categoryValidationSchema.updateSchema.validate(req.body);
            const data = await categoryService.update(req.params.categoryId, value);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const data = await categoryService.delete(req.params.categoryId);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    get: async (req, res) => {
        try {
            const data = await categoryService.get(req.params.categoryId);
            return res.status(200).json({ status: 200, data: data || {} });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    }
};

module.exports = categoryController;