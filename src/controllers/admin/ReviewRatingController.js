const ReviewRatingService = require('../../services/admin/ReviewRatingService');
const ReviewRatingValidateSchema = require('../../validations/ReviewRatingValidateSchema');


const ReviewRatingController = {
    add: async (req, res) => {
        const { error, value } = ReviewRatingValidateSchema.createSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error.details[0].message });
        }

        try {
            value.addedBy = req.user.userId;
            const data = await ReviewRatingService.add(value);
            return res.status(200).json({ status: 200, msg: "Review added" });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const data = await ReviewRatingService.getAll();
            return res.status(200).json({ status: 200, data: data || [] });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { error, value } = ReviewRatingValidateSchema.updateSchema.validate(req.body);
            const data = await ReviewRatingService.update(req.params.reviewId, value);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    approve: async (req, res) => {
        try {
            const data = await ReviewRatingService.update(req.params.reviewId,
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
    delete: async (req, res) => {
        try {
            const data = await ReviewRatingService.delete(req.params.reviewId);
            return res.status(200).json({ status: 200, data: data });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    },
    get: async (req, res) => {
        try {
            const data = await ReviewRatingService.get(req.params.reviewId);
            return res.status(200).json({ status: 200, data: data || {} });
        } catch (error) {
            return res.status(500).json({ status: 500, error: error.message });
        }
    }
}

module.exports = ReviewRatingController;