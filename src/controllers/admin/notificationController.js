
const notificationService = require('../../services/admin/notificationService');
const notificationValidatedSchema = require('../../validations/notificationValidateSchema');


const notificationController = {
    add: async (req, res) => {
        const { error, value } = notificationValidatedSchema.createSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }

        try {
            const data = await notificationService.add(value);
            return res.status(200).json({ status: 200, msg: "Notification added" });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const data = await notificationService.getAll("");
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getNewOrderNotification: async (req, res) => {
        try {
            const data = await notificationService.getAll("New Order Placed!");
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { error, value } = notificationValidatedSchema.updateSchema.validate(req.body);

            const data = await notificationService.update(req.params.notificationId, value);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const data = await notificationService.delete(req.params.notificationId);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    get: async (req, res) => {
        try {
            const data = await notificationService.get(req.params.notificationId);
            return res.status(200).json({ status: 200, data: data || {} });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    userNotifications: async (req, res) => {
        try {
            const userId = req.user.userId;
            const data = await notificationService.userNotifications(userId);
            return res.status(200).json({ status: 200, data: data || {} });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    }
}

module.exports = notificationController;
