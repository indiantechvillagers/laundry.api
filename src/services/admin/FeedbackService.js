const models = require('../../models');
const excludeAttributes = { exclude: ['createdAt', 'updatedAt'] };

const FeedbackService = {
    add: async (payload) => {
        try {
            // Create admin record in the database
            const data = await models.Feedbacks.create(payload);
            // return admin;
            return data;
        } catch (error) {
            console.log(error)
            // Handle any errors that occur during database operation
            throw new Error('Failed to add');
        }
    },
    getAll: async () => {
        try {
            const data = await models.Feedbacks.findAll({
                // where: {
                //     isActive: true,
                //     isDeleted: false
                // }
                include: [
                    {
                        model: models.Users,
                        as: 'userData',
                        attibutes: { exclude: ['createdAt', 'updatedAt', 'password'] }
                    },
                    {
                        model: models.Users,
                        as: 'approverData',
                        attibutes: { exclude: ['createdAt', 'updatedAt', 'password'] }
                    },
                    {
                        model: models.Products,
                        as: 'productData',
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
            const [rowsAffected, updatedData] = await models.Feedbacks.update(paylod, {
                where: {
                    feedbackId: id
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
            throw new Error('Failed to update');
        }
    },
    delete: async (id) => {
        try {
            // Create admin record in the database
            const [rowsAffected, updatedData] = await models.Feedbacks.update({ isDeleted: true }, {
                where: {
                    feedbackId: id
                }
            });

            if (rowsAffected > 0) {
                return 'Data deleted successfully';
            } else {
                return 'No data found matching the condition';
            }
        } catch (error) {
            throw new Error('Failed to delete data');
        }
    },
    get: async (id) => {
        try {
            const data = await models.Feedbacks.findOne({
                where: {
                    feedbackId: id,
                    // isActive: true,
                    // isDeleted: false
                },
                include: [
                    {
                        model: models.Users,
                        as: 'userData',
                        attibutes: { exclude: ['createdAt', 'updatedAt', 'password'] }
                    },
                    {
                        model: models.Users,
                        as: 'approverData',
                        attibutes: { exclude: ['createdAt', 'updatedAt', 'password'] }
                    },
                    {
                        model: models.Products,
                        as: 'productData',
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

module.exports = FeedbackService;