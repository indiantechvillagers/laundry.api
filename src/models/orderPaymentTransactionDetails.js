// Explanation:

// transactionId: Unique identifier for the payment transaction, set as the primary key.
// orderId: Foreign key referencing the order for which the payment was made.
// paymentId: Identifier provided by Razorpay for the payment.
// amount: Amount of the payment.
// currency: Currency of the payment.
// method: Payment method used (e.g., card, UPI, net banking).
// status: Status of the payment (e.g., authorized, captured, failed).
// captured: Boolean indicating whether the payment has been captured.
// createdAt and updatedAt: Timestamps indicating the creation and last update times of the record.

module.exports = (sequelize, Sequelize) => {
    const OrderPaymentTransactionDetails = sequelize.define("OrderPaymentTransactionDetails", {
        transactionId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        paymentId: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        amount: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        currency: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        method: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        status: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        captured: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        transactionFor: {
            type: Sequelize.ENUM('Order', 'Refund'), //restrict the transactionFor column to accept only two values - "Order" or "Refund" 
            allowNull: false
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    OrderPaymentTransactionDetails.removeAttribute('id');
    return OrderPaymentTransactionDetails;
};