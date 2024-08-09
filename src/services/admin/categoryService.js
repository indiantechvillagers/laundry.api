const models = require('../../models');

const categoryService = {
    add: async (payload) => {
        try {
            // Create admin record in the database
            const data = await models.Category.create(payload);
            // return admin;
            return data;
        } catch (error) {
            // Handle any errors that occur during database operation
            throw new Error('Failed to add');
        }
    },
    getAll: async () => {
        try {
            const data = await models.Category.findAll({
                // where: {
                //     isActive: true,
                //     isDeleted: false
                // },
                include: [{
                    model: models.SubCategories,
                    as: 'subCategories',
                    include: [{
                        model: models.Products,
                        as: 'products'
                    }]
                }]
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    getAlldd: async () => {
        try {
            const data = await models.Category.findAll({
                where: {
                    isActive: true,
                    isDeleted: false
                },
                include: [{
                    model: models.SubCategories,
                    as: 'subCategories',
                    include: [{
                        model: models.Products,
                        as: 'products'
                    }]
                }]
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    update: async (id, paylod) => {
        try {
            // Create admin record in the database
            const [rowsAffected, updatedData] = await models.Category.update(paylod, {
                where: {
                    categoryId: id
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
            const [rowsAffected, updatedData] = await models.Category.update({ isDeleted: true }, {
                where: {
                    categoryId: id
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
            const data = await models.Category.findOne({
                where: {
                    categoryId: id,
                    // isActive: true,
                    // isDeleted: false
                },
                include: [
                    {
                        model: models.SubCategories,
                        as: 'subCategories',
                        include: [
                            {
                                model: models.Products,
                                as: 'products'
                            }
                        ]
                    }
                ]
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = categoryService;