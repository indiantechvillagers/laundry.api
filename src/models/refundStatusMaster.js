module.exports = (sequelize, Sequelize) => {
    const RefundStatusMaster = sequelize.define("RefundStatusMaster", {
        refundStatusId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        refundStatusName: {
            type: Sequelize.STRING,
            field: 'refundStatusName',
            unique: {
                name: 'unique_refundStatusName' // Specify a specific name for the unique index
            }
        },
        serial: {
            type: Sequelize.INTEGER,
            field: 'Serial'
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
                    const highestSerial = await RefundStatusMaster.max('serial');
                    // Increment it by one
                    data.serial = highestSerial ? highestSerial + 1 : 1;
                }
            }
        }
    });
    RefundStatusMaster.removeAttribute('id');
    return RefundStatusMaster;
};