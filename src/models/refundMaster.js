module.exports = (sequelize, Sequelize) => {
    const RefundMaster = sequelize.define("RefundMaster", {
        refundId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        refundReason: {
            type: Sequelize.STRING(750),
            field: 'refundReason'
        },
        adminNotes: {
            type: Sequelize.STRING(750),
            field: 'adminNotes'
        },
        upi: {
            type: Sequelize.STRING(20),
            field: 'upi'
        },
        accountHolderName: {
            type: Sequelize.STRING(50),
            field: 'accountHolderName'
        },
        accountNumber: {
            type: Sequelize.STRING(20),
            field: 'accountNumber'
        },
        ifscCode: {
            type: Sequelize.STRING(20),
            field: 'ifscCode'
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
    RefundMaster.removeAttribute('id');
    return RefundMaster;
};