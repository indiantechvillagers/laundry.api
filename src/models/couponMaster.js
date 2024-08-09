module.exports = (sequelize, Sequelize) => {
    const CouponMaster = sequelize.define("CouponMaster", {
        couponId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        couponCode: {
            type: Sequelize.STRING,
            field: 'couponCode',
            unique: {
                name: 'unique_couponCode' // Specify a specific name for the unique index
            }
        },
        couponDescriptions: {
            type: Sequelize.STRING,
            field: 'couponDescriptions'
        },
        discountType: {
            type: Sequelize.STRING,
            field: 'discountType',
            validate: {
                // Custom validation function to check if the value is either "FLAT" or "PERCENTAGE"
                isInEnum(value) {
                    if (value !== 'FLAT' && value !== 'PERCENTAGE') {
                        throw new Error('Discount type must be either "FLAT" or "PERCENTAGE"');
                    }
                }
            }
        },
        totalUsageLimit: {
            type: Sequelize.INTEGER,
            field: 'totalUsageLimit'
        },
        minOrderAmount: {
            type: Sequelize.FLOAT,
            field: 'minOrderAmount'
        },
        maxOrderAmount: {
            type: Sequelize.FLOAT,
            field: 'maxOrderAmount'
        },
        discountAmount: {
            type: Sequelize.FLOAT,
            field: 'discountAmount'
        },
        couponExpiryDate: {
            type: Sequelize.DATE,
            field: 'couponExpiryDate'
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
    CouponMaster.removeAttribute('id');
    return CouponMaster;
};