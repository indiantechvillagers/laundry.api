module.exports = (sequelize, Sequelize) => {
    const OrderStatusMaster = sequelize.define("OrderStatusMaster", {
        orderStatusId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        statusName: {
            type: Sequelize.STRING(255),
            field: 'statusName'
        },
        shortForm: {
            type: Sequelize.STRING(255),
            field: 'shortForm'
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
            beforeCreate: async (orderStatus, options) => {
                if (!orderStatus.serial) {
                    // Find the highest existing serial value
                    const highestSerial = await OrderStatusMaster.max('serial');
                    // Increment it by one
                    orderStatus.serial = highestSerial ? highestSerial + 1 : 1;
                }
            }
        }
    });
    OrderStatusMaster.removeAttribute('id');
    return OrderStatusMaster;
};