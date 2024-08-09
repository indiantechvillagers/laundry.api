//Orders

module.exports = (sequelize, Sequelize) => {
    const Orders = sequelize.define("Orders", {
        orderId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        pickUpSlot: {
            type: Sequelize.STRING(100),
            field: 'pickUpSlot'
        },
        deliverySlot: {
            type: Sequelize.STRING(100),
            field: 'deliverySlot'
        },
        totalPrice: {
            type: Sequelize.FLOAT,
            field: 'totalPrice'
        },
        deliveryCharge: {
            type: Sequelize.FLOAT,
            field: 'deliveryCharge'
        },
        couponApplied: {
            type: Sequelize.STRING,
            field: 'couponApplied'
        },
        couponDiscountAmount: {
            type: Sequelize.FLOAT,
            field: 'couponDiscountAmount'
        },
        sgst: {
            type: Sequelize.FLOAT,
            field: 'sgst'
        },
        cgst: {
            type: Sequelize.FLOAT,
            field: 'cgst'
        },
        gst: {
            type: Sequelize.FLOAT,
            field: 'gst'
        },
        totalPayableAmount: {
            type: Sequelize.FLOAT,
            field: 'totalPayableAmount'
        },
        deleveryOtp: {
            type: Sequelize.STRING(10),
            field: 'deleveryOtp'
        },
        paymentStatus: {
            type: Sequelize.STRING(10),
            field: 'paymentStatus',
            defaultValue: 'Pending',
            validate: {
                isIn: {
                    args: [['Pending', 'Paid']],
                    msg: 'Payment status must be either "Pending" or "Paid"'
                }
            }
        },
        isOrderCompleted: {
            type: Sequelize.BOOLEAN,
            default: false
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
        timestamps: true
    });
    Orders.removeAttribute('id');
    return Orders;
};