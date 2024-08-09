module.exports = (sequelize, Sequelize) => {
    const CartIdMaster = sequelize.define("CartIdMaster", {
        cartId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            field: 'IsActive',
            allowNull: true
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            field: 'isDeleted',
            allowNull: false
        },
        isOrderCompleted: {
            type: Sequelize.BOOLEAN,
            field: 'isOrderCompleted',
            allowNull: false
        },
        deviceId: {
            type: Sequelize.STRING,
            field: 'DeviceId'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    CartIdMaster.removeAttribute('id');
    return CartIdMaster;
};