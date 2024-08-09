module.exports = (sequelize, Sequelize) => {
    const OrderPaymentTypeMaster = sequelize.define("OrderPaymentTypeMaster", {
        paymentTypeId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        paymentTypeName: {
            type: Sequelize.STRING(255),
            field: 'paymentTypeName'
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
                    const highestSerial = await OrderPaymentTypeMaster.max('serial');
                    // Increment it by one
                    data.serial = highestSerial ? highestSerial + 1 : 1;
                }
            }
        }
    });
    OrderPaymentTypeMaster.removeAttribute('id');
    return OrderPaymentTypeMaster;
};