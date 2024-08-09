const models = require('../../models');

const pinCodeService = {
    add: async (payload) => {
        try {
            // Create admin record in the database
            const data = await models.PincodeMaster.create(payload);
            // return admin;
            return data;
        } catch (error) {
            // Handle any errors that occur during database operation
            throw new Error('Failed to add');
        }
    },
    getAll: async () => {
        try {
            const data = await models.PincodeMaster.findAll({
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
    update: async (id, paylod) => {
        try {
            // Create admin record in the database
            const [rowsAffected, updatedData] = await models.PincodeMaster.update(paylod, {
                where: {
                    pincodeId: id
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
            const [rowsAffected, updatedData] = await models.PincodeMaster.update({ isDeleted: true }, {
                where: {
                    pincodeId: id
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
            const data = await models.PincodeMaster.findOne({
                where: {
                    pincodeId: id,
                    // isActive: true,
                    // isDeleted: false
                }
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = pinCodeService;