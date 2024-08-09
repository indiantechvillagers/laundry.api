const FeedbackService = require('../../services/admin/FeedbackService');
const FeedbackValidatedSchema = require("../../validations/FeedbackValidateSchema");


const FeedbackController = {
    add: async (req, res) => {
        const { error, value } = FeedbackValidatedSchema.createSchema.validate(req.body);
        value.addedBy = req.user.userId;
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }

        try {
            const data = await FeedbackService.add(value);

            return res.status(200).json({ status: 200, msg: "Feedback added" });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const data = await FeedbackService.getAll();
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { error, value } = FeedbackValidatedSchema.updateSchema.validate(req.body);

            const data = await FeedbackService.update(req.params.feedbackId, value);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const data = await FeedbackService.delete(req.params.feedbackId);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    get: async (req, res) => {
        try {
            const data = await FeedbackService.get(req.params.feedbackId);
            return res.status(200).json({ status: 200, data: data || {} });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    approve: async (req, res) => {
        try {
            const data = await FeedbackService.update(req.params.feedbackId,
                {
                    "isApproved": true,
                    "approvedBy": req.user.userId
                }
            );
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
}

module.exports = FeedbackController;
