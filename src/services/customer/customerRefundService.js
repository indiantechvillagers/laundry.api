const models = require('../../models');

const refundMasterService = {
    add: async (payload) => {
        try {
            // Create admin record in the database

            payload.refundStatusId = 1

            const data = await models.RefundMaster.create(payload);
            // return admin;
            return data;
        } catch (error) {
            console.log(error)
            // Handle any errors that occur during database operation
            throw new Error('Failed to add');
        }
    },
    getAll: async (userId) => {
        try {
            const data = await models.RefundMaster.findAll({
                where: {
                    userId: userId
                },
                include: [
                    {
                        model: models.Orders,
                        as: 'order'
                    },
                    {
                        model: models.RefundStatusMaster,
                        as: 'refundStatus'
                    },
                    {
                        model: models.RefundRequestMethodMaster,
                        as: 'refundMethod'
                    },
                    {
                        model: models.OrderPaymentTransactionDetails,
                        as: 'refundTransactionDetails'
                    },
                    // {
                    //     model: models.Users,
                    //     as: 'owner'
                    // },
                ],
                order: [['refundId', 'DESC']]
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    update: async (id, paylod) => {
        try {
            // Create admin record in the database
            const [rowsAffected, updatedData] = await models.RefundMaster.update(paylod, {
                where: {
                    refundId: id
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
            const [rowsAffected, updatedData] = await models.RefundMaster.update({ isDeleted: true }, {
                where: {
                    refundId: id
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
            const data = await models.RefundMaster.findOne({
                where: {
                    refundId: id,
                    // isActive: true,
                    // isDeleted: false
                },
                include: [
                    {
                        model: models.Orders,
                        as: 'order'
                    },
                    {
                        model: models.RefundStatusMaster,
                        as: 'refundStatus'
                    },
                    {
                        model: models.RefundRequestMethodMaster,
                        as: 'refundMethod'
                    },
                    {
                        model: models.OrderPaymentTransactionDetails,
                        as: 'refundTransactionDetails'
                    },
                ]
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}


module.exports = refundMasterService;