module.exports = (sequelize, Sequelize) => {
    const ModuleMasters = sequelize.define("ModuleMasters", {
        moduleId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        moduleName: {
            type: Sequelize.STRING(255),
            field: 'moduleName'
        },
        serial: {
            type: Sequelize.INTEGER,
            field: 'serial'
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
                    const highestSerial = await ModuleMasters.max('serial');
                    // Increment it by one
                    data.serial = highestSerial ? highestSerial + 1 : 1;
                }
            }
        }
    });
    ModuleMasters.removeAttribute('id');
    return ModuleMasters;
};