const models = require('../../models');

const notificationService = {
    add: async (payload) => {
        try {
            // Create admin record in the database
            const data = await models.NotificationMaster.create(payload);
            // return admin;
            return data;
        } catch (error) {
            console.log(error)
            // Handle any errors that occur during database operation
            throw new Error('Failed to add');
        }
    },
    getAll: async (notiTitle) => {
        try {

            if (notiTitle == "New Order Placed!") {

                const data = await models.NotificationMaster.findAll({
                    where: {
                        // isActive: true,
                        // isDeleted: false,
                        notificationTitle: notiTitle
                    },
                    include: [
                        {
                            model: models.Users,
                            as: 'user'
                        },
                        {
                            model: models.Orders,
                            as: 'order'
                        }
                    ],
                    order: [['notificationId', 'DESC']]
                });

                const unreadCount = await models.NotificationMaster.count({
                    where: {
                        isRead: false,
                        notificationTitle: notiTitle
                    }
                });

                return { data: data, unreadCount: unreadCount };

            } else {
                const data = await models.NotificationMaster.findAll({
                    // where: {
                    //     isActive: true,
                    //     isDeleted: false
                    // }
                    include: [
                        {
                            model: models.Users,
                            as: 'user'
                        },
                        {
                            model: models.Orders,
                            as: 'order'
                        }
                    ],
                    order: [['notificationId', 'DESC']]
                });

                const unreadCount = await models.NotificationMaster.count({
                    where: {
                        isRead: false
                    }
                });

                return { data: data, unreadCount: unreadCount };
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    update: async (id, paylod) => {
        try {
            // Create admin record in the database
            const [rowsAffected, updatedData] = await models.NotificationMaster.update(paylod, {
                where: {
                    notificationId: id
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
            const [rowsAffected, updatedData] = await models.NotificationMaster.update({ isDeleted: true }, {
                where: {
                    notificationId: id
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
            const data = await models.NotificationMaster.findOne({
                where: {
                    notificationId: id,
                    // isActive: true,
                    // isDeleted: false
                },
                include: [
                    {
                        model: models.Users,
                        as: 'user'
                    },
                    {
                        model: models.Orders,
                        as: 'order'
                    }
                ]
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    userNotifications: async (id) => {
        try {
            const data = await models.NotificationMaster.findAll({
                where: {
                    userId: id
                },
                include: [
                    {
                        model: models.Users,
                        as: 'user'
                    },
                    {
                        model: models.Orders,
                        as: 'order'
                    }
                ]
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}


module.exports = notificationService;