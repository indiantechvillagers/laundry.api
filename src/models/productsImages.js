module.exports = (sequelize, Sequelize) => {
    const ProductsImages = sequelize.define("ProductsImages", {
        productImageId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        productImage: {
            type: Sequelize.STRING(255),
            field: 'productImage'
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        isDefault: {
            type: Sequelize.BOOLEAN
        },
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true,
        hooks: {
            // Before creating a new record, check if any record exists for the same productId
            async beforeCreate(productsImages, options) {
                const existingImage = await ProductsImages.findOne({
                    where: {
                        productId: productsImages.productId // Assuming productId is the foreign key
                    }
                });

                // If no existing image is found, set isDefault to true
                if (!existingImage) {
                    productsImages.isDefault = true;
                }
            }
        }
    });
    ProductsImages.removeAttribute('id');
    return ProductsImages;
};