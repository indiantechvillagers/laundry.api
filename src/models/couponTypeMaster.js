module.exports = (sequelize, Sequelize) => {
    const CouponTypeMaster = sequelize.define("CouponTypeMaster", {
        couponTypeId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        couponTypeName: {
            type: Sequelize.STRING,
            field: 'couponTypeName',
            unique: {
                name: 'unique_couponTypeName' // Specify a specific name for the unique index
            }
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
                    const highestSerial = await CouponTypeMaster.max('serial');
                    // Increment it by one
                    data.serial = highestSerial ? highestSerial + 1 : 1;
                }
            }
        }
    });
    CouponTypeMaster.removeAttribute('id');
    return CouponTypeMaster;
};