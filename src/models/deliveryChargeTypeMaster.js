module.exports = (sequelize, Sequelize) => {
    const DeliveryChargeTypeMaster = sequelize.define("DeliveryChargeTypeMaster", {
        deliveryChargeTypeId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        deliveryChargeTypeName: {
            type: Sequelize.STRING(255),
            field: 'deliveryChargeTypeName'
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
                    const highestSerial = await DeliveryChargeTypeMaster.max('serial');
                    // Increment it by one
                    data.serial = highestSerial ? highestSerial + 1 : 1;
                }
            }
        }
    });
    DeliveryChargeTypeMaster.removeAttribute('id');
    return DeliveryChargeTypeMaster;
};