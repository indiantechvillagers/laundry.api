const models = require('../../models');



const dashboardService = {
    get: async () => {
        try {
            const data = {}

            // userCount------------------------------
            const userCount = await models.Users.count({
                where: {
                    roleId: 2,
                    isActive: true,
                    isDeleted: false
                },
            });
            data.userCount = userCount;

            // ProductCount---------------------------------
            const ProductCount = await models.Products.count({
                where: {
                    isActive: true,
                    isDeleted: false
                },
            });
            data.ProductCount = ProductCount;

            // allOrderCount-------------------------------
            const allOrderCount = await models.Orders.count({
                where: {
                    isActive: true,
                    isDeleted: false
                },
            });
            data.allOrderCount = allOrderCount;
            // newOrderCount-------------------------------
            const newOrderCount = await models.Orders.count({
                where: {
                    orderStatusId: 1,
                    isActive: true,
                    isDeleted: false
                },
            });
            data.newOrderCount = newOrderCount;

            // catagoryCount----------------------------------
            const catagoryCount = await models.Category.count({
                where: {
                    isActive: true,
                    isDeleted: false
                },
            });
            data.catagoryCount = catagoryCount;

            // subCatagoryCount--------------------------------------
            const subCatagoryCount = await models.SubCategories.count({
                where: {
                    isActive: true,
                    isDeleted: false
                },
            });
            data.subCatagoryCount = subCatagoryCount;

            return data
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = dashboardService;