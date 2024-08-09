module.exports = (sequelize, Sequelize) => {
    const RefundRequestMethodMaster = sequelize.define("RefundRequestMethodMaster", {
        refundRequestMethodId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        refundRequestMethodName: {
            type: Sequelize.STRING,
            field: 'refundRequestMethodName',
            unique: {
                name: 'unique_refundRequestMethodName' // Specify a specific name for the unique index
            }
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
    RefundRequestMethodMaster.removeAttribute('id');
    return RefundRequestMethodMaster;
};