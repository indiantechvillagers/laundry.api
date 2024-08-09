module.exports = (sequelize, Sequelize) => {
    const PincodeMaster = sequelize.define("PincodeMaster", {
        pincodeId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        pincode: {
            type: Sequelize.STRING(255),
            field: 'pincode'
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
    PincodeMaster.removeAttribute('id');
    return PincodeMaster;
};