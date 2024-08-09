module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define("Products", {
        productId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        productName: {
            type: Sequelize.STRING(255),
            field: 'productName'
        },
        thumbnailImage: {
            type: Sequelize.STRING(255),
            field: 'thumbnailImage'
        },
        price: {
            type: Sequelize.FLOAT,
            field: 'price'
        },
        longDescription: {
            type: Sequelize.TEXT('long'),
            field: 'LongDescription'
        },
        shortDescription: {
            type: Sequelize.TEXT('long'),
            field: 'ShortDescription'
        },
        serial: {
            type: Sequelize.STRING(255),
            field: 'serial'
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            default: true
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            default: false
        },
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true,
        hooks: {
            beforeCreate: async (data, options) => {
                if (!data.serial) {
                    // Find the highest existing serial value
                    const highestSerial = await Products.max('serial');
                    // Increment it by one
                    data.serial = highestSerial ? highestSerial + 1 : 1;
                }
            }
        }
    });
    Products.removeAttribute('id');
    return Products;
};