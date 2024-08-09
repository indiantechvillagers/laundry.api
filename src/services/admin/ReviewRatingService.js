const models = require('../../models');
const excludeAttributes = { exclude: ['createdAt', 'updatedAt'] };

const ReviewRatingService = {
    add: async (payload) => {
        try {
            // Create admin record in the database
            const data = await models.ReviewRatings.create(payload);
            // return admin;
            return data;
        } catch (error) {
            console.log(error)
            // Handle any errors that occur during database operation
            throw new Error(error.message);
        }
    },
    getAll: async () => {
        try {
            const data = await models.ReviewRatings.findAll({
                // where: {
                //     isActive: true,
                //     isDeleted: false
                // }
                include: [
                    {
                        model: models.Users,
                        as: 'addedUser',
                        attibutes: { exclude: ['createdAt', 'updatedAt', 'password'] }
                    },
                    {
                        model: models.Users,
                        as: 'approver',
                        attibutes: { exclude: ['createdAt', 'updatedAt', 'password'] }
                    },
                    {
                        model: models.Products,
                        as: 'product',
                        attibutes: excludeAttributes
                    }
                ]
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    update: async (id, paylod) => {
        try {
            // Create admin record in the database
            const [rowsAffected, updatedData] = await models.ReviewRatings.update(paylod, {
                where: {
                    reviewId: id
                }
            });

            if (rowsAffected > 0) {
                return 'Data updated successfully';
            } else {
                return 'No data found matching the condition';
            }

        } catch (error) {
            console.log(error)
            // Handle any errors that occur during database operation
            throw new Error(error.message);
        }
    },
    delete: async (id) => {
        try {
            // Create admin record in the database
            const [rowsAffected, updatedData] = await models.ReviewRatings.update({ isDeleted: true }, {
                where: {
                    reviewId: id
                }
            });

            if (rowsAffected > 0) {
                return 'Data deleted successfully';
            } else {
                return 'No data found matching the condition';
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    get: async (id) => {
        try {
            const data = await models.ReviewRatings.findOne({
                where: {
                    reviewId: id,
                    // isActive: true,
                    // isDeleted: false
                },
                include: [
                    {
                        model: models.Users,
                        as: 'addedUser',
                        attibutes: { exclude: ['createdAt', 'updatedAt', 'password'] }

                    },
                    {
                        model: models.Users,
                        as: 'approver',
                        attibutes: { exclude: ['createdAt', 'updatedAt', 'password'] }
                    },
                    {
                        model: models.Products,
                        as: 'product',
                        attibutes: excludeAttributes
                    }
                ]
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = ReviewRatingService;