const models = require('../../models');

const couponTypeMasterService = {
    add: async (payload) => {
        try {
            // Create admin record in the database
            const data = await models.CouponTypeMaster.create(payload);
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
            const data = await models.CouponTypeMaster.findAll({
                // where: {
                //     isActive: true,
                //     isDeleted: false
                // }
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getAlldd: async () => {
        try {
            const data = await models.CouponTypeMaster.findAll({
                where: {
                    isActive: true,
                    isDeleted: false
                }
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    update: async (id, paylod) => {
        try {
            // Create admin record in the database
            const [rowsAffected, updatedData] = await models.CouponTypeMaster.update(paylod, {
                where: {
                    couponTypeId: id
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
            const [rowsAffected, updatedData] = await models.CouponTypeMaster.update({ isDeleted: true }, {
                where: {
                    couponTypeId: id
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
            const data = await models.CouponTypeMaster.findOne({
                where: {
                    couponTypeId: id,
                    // isActive: true,
                    // isDeleted: false
                }
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = couponTypeMasterService;