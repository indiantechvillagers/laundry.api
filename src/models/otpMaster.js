module.exports = (sequelize, Sequelize) => {
    const OTPMaster = sequelize.define("OTPMaster", {
        otpId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        otp: {
            type: Sequelize.STRING,
            allowNull: true
        },
        otpExpiration: {
            type: Sequelize.DATE,
            allowNull: true
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
    OTPMaster.removeAttribute('id');
    return OTPMaster;
};