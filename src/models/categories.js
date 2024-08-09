module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("Category", {
        categoryId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        categoryName: {
            type: Sequelize.STRING(255),
            field: 'categoryName',
            unique: {
                name: 'unique_categoryName' // Specify a specific name for the unique index
            }
        },
        serial: {
            type: Sequelize.STRING(255),
            field: 'serial'
        },
        categoryImage: {
            type: Sequelize.STRING(255),
            field: 'categoryImage'
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
                    const highestSerial = await Category.max('serial');
                    // Increment it by one
                    data.serial = highestSerial ? highestSerial + 1 : 1;
                }
            }
        }
    });
    Category.removeAttribute('id');
    return Category;
};