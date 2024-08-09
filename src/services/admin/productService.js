const models = require('../../models');

const productService = {
    add: async (payload) => {
        try {
            // Create admin record in the database
            const data = await models.Products.create(payload);
            // return admin;
            return data;
        } catch (error) {
            // Handle any errors that occur during database operation
            throw new Error('Failed to add');
        }
    },
    getAll: async () => {
        try {
            const data = await models.Products.findAll({
                // where: {
                //     isActive: true,
                //     isDeleted: false
                // },
                include: [
                    {
                        model: models.Category,
                        as: 'category'
                    },
                    {
                        model: models.SubCategories,
                        as: 'subCategory'
                    },
                    {
                        model: models.ProductsImages,
                        as: 'images'
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
            const [rowsAffected, updatedData] = await models.Products.update(paylod, {
                where: {
                    productId: id
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
            const [rowsAffected, updatedData] = await models.Products.update({ isDeleted: true }, {
                where: {
                    productId: id
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
            const data = await models.Products.findOne({
                where: {
                    productId: id,
                    // isActive: true,
                    // isDeleted: false
                },
                include: [
                    {
                        model: models.Category,
                        as: 'category'
                    },
                    {
                        model: models.SubCategories,
                        as: 'subCategory'
                    },
                    {
                        model: models.ProductsImages,
                        as: 'images'
                    }
                ]
            });
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    addImage: async (payload) => {
        try {
            // Create admin record in the database
            const data = await models.ProductsImages.create(payload);
            // return admin;
            return data;
        } catch (error) {
            // Handle any errors that occur during database operation
            throw new Error('Failed to add');
        }
    },
    deleteImage: async (id) => {
        try {
            const data = await models.ProductsImages.destroy({
                where: {
                    productImageId: id
                }
            });

            console.log(data)

            if (data) {
                return 'Image deleted successfully';
            } else {
                return 'No data found matching the condition';
            }
        } catch (error) {
            throw new Error('Failed to delete data');
        }
    },
    updateImage: async (id, paylod) => {
        try {
            // Create admin record in the database
            const [rowsAffected, updatedData] = await models.ProductsImages.update(paylod, {
                where: {
                    productImageId: id
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
};

module.exports = productService;