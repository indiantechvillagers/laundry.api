const productService = require('../../services/admin/productService');
const productValidationSchema = require('../../validations/productValidationSchema');

const categoryController = {
    add: async (req, res) => {
        const { error, value } = productValidationSchema.createSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }

        try {
            const data = await productService.add(value);

            return res.status(200).json({ status: 200, msg: "Product added" });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const data = await productService.getAll();
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { error, value } = productValidationSchema.updateSchema.validate(req.body);

            const data = await productService.update(req.params.productId, value);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const data = await productService.delete(req.params.productId);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    get: async (req, res) => {
        try {
            const data = await productService.get(req.params.productId);
            return res.status(200).json({ status: 200, data: data || {} });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    addImage: async (req, res) => {
        try {

            req.body.productId = req.params.productId

            const data = await productService.addImage(req.body);

            return res.status(200).json({ status: 200, msg: "Product image added" });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    deleteImage: async (req, res) => {
        try {
            const data = await productService.deleteImage(req.params.productImageId);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    updateImage: async (req, res) => {
        try {
            const data = await productService.updateImage(req.params.productImageId, req.body);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
};

module.exports = categoryController;