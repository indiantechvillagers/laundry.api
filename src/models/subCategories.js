module.exports = (sequelize, Sequelize) => {
    const SubCategories = sequelize.define("SubCategories", {
        subCategoryId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        subCategoryName: {
            type: Sequelize.STRING(255),
            field: 'subCategoryName',
            unique: {
                name: 'unique_subCategoryName' // Specify a specific name for the unique index
            }
        },
        serial: {
            type: Sequelize.STRING(255),
            field: 'serial'
        },
        subCategoryImage: {
            type: Sequelize.STRING(255),
            field: 'subCategoryImage'
        },
        thumbnailImage: {
            type: Sequelize.STRING(255),
            field: 'thumbnailImage'
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            default: true
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            default: false
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true,
        hooks: {
            beforeCreate: async (data, options) => {
                if (!data.serial) {
                    // Find the highest existing serial value
                    const highestSerial = await SubCategories.max('serial');
                    // Increment it by one
                    data.serial = highestSerial ? highestSerial + 1 : 1;
                }
            }
        }
    });
    SubCategories.removeAttribute('id');
    return SubCategories;
};