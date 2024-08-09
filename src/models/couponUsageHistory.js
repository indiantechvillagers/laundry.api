module.exports = (sequelize, Sequelize) => {
    const CouponUsageHistory = sequelize.define("CouponUsageHistory", {
        couponUsageHistoryId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
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
        timestamps: true
    });
    CouponUsageHistory.removeAttribute('id');
    return CouponUsageHistory;
};