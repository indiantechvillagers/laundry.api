const models = require('../../models');

const userService = {
    getAllUsers: async () => {
        try {
            const admins = await models.Users.findAll({
                where: {
                    // isActive: true,
                    // isDeleted: false,
                    roleId: 1
                },
                include: [{
                    model: models.RoleMasters,
                    as: 'role'
                }]
            });
            return admins;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getCustomerList: async () => {
        try {
            const admins = await models.Users.findAll({
                where: {
                    // isActive: true,
                    // isDeleted: false,
                    roleId: 2
                },
                include: [
                    {
                        model: models.RoleMasters,
                        as: 'role'
                    }
                ]
            });
            return admins;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    userProfile: async (userId) => {
        try {
            const user = await models.Users.findOne({
                where: {
                    userId: userId,
                    // isActive: true,
                    // isDeleted: false
                },
                include: [
                    {
                        model: models.RoleMasters,
                        as: 'role'
                    },
                    {
                        model: models.Orders,
                        as: 'orders'
                    }
                ]
            });
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    addUser: async (adminData) => {
        try {
            // Create admin record in the database
            const admin = await models.Users.create(adminData);
            // return admin;
            return admin;
        } catch (error) {
            // Handle any errors that occur during database operation
            throw new Error('Failed to add user');
        }
    },
    userSoftDelete: async (userId) => {
        try {
            // Create admin record in the database
            const [rowsAffected, updatedUsers] = await models.Users.update({ isDeleted: true }, {
                where: {
                    userId: userId
                }
            });
            // return admin;
            // return { status: 200, response: 'success', data: admin };

            if (rowsAffected > 0) {
                return 'User deleted successfully';
            } else {
                return 'No users found matching the condition';
            }

        } catch (error) {
            console.log(error)
            // Handle any errors that occur during database operation
            throw new Error('Failed to delete user');
        }
    },
    updateUserInfo: async (userId, paylod) => {
        try {
            // Create admin record in the database
            const [rowsAffected, updatedUsers] = await models.Users.update(paylod, {
                where: {
                    userId: userId
                }
            });

            if (rowsAffected > 0) {
                return 'User data updated successfully';
            } else {
                return 'No users found matching the condition';
            }

        } catch (error) {
            console.log(error)
            // Handle any errors that occur during database operation
            throw new Error('Failed to delete user');
        }
    }
};

module.exports = userService;