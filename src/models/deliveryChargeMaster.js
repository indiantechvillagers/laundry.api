module.exports = (sequelize, Sequelize) => {
    const DeliveryChargeMaster = sequelize.define("DeliveryChargeMaster", {
        deliveryChargeId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        deliveryChargeAmount: {
            type: Sequelize.FLOAT,
            field: 'deliveryChargeAmount'
        },
        pinCode: {
            type: Sequelize.STRING(255),
            field: 'PinCode',
        },
        minOrderAmount: {
            type: Sequelize.FLOAT,
            field: 'minOrderAmount'
        },
        maxOrderAmount: {
            type: Sequelize.FLOAT,
            field: 'maxOrderAmount'
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
                    const highestSerial = await DeliveryChargeMaster.max('serial');
                    // Increment it by one
                    data.serial = highestSerial ? highestSerial + 1 : 1;
                }
            }
        }
    });
    DeliveryChargeMaster.removeAttribute('id');
    return DeliveryChargeMaster;
};