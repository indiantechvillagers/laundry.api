const models = require('../../models');

const couponService = {
    add: async (payload) => {
        try {
            // Create admin record in the database
            const data = await models.CouponMaster.create(payload);
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
            const data = await models.CouponMaster.findAll({
                // where: {
                //     isActive: true,
                //     isDeleted: false
                // }
                include: [
                    {
                        model: models.CouponTypeMaster,
                        as: 'couponType'
                    },
                    {
                        model: models.CouponUsageHistory,
                        as: 'usageHistory'
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
            const [rowsAffected, updatedData] = await models.CouponMaster.update(paylod, {
                where: {
                    couponId: id
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
            const [rowsAffected, updatedData] = await models.CouponMaster.update({ isDeleted: true }, {
                where: {
                    couponId: id
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
            const data = await models.CouponMaster.findOne({
                where: {
                    couponId: id,
                    // isActive: true,
                    // isDeleted: false
                },
                include: [
                    {
                        model: models.CouponTypeMaster,
                        as: 'couponType'
                    },
                    {
                        model: models.CouponUsageHistory,
                        as: 'usageHistory'
                    }
                ]
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = couponService;