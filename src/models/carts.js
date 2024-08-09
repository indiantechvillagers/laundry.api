module.exports = (sequelize, Sequelize) => {
    const Carts = sequelize.define("Carts", {
        cartProductId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            field: 'quantity'
        },
        pricePerQantity: {
            type: Sequelize.FLOAT,
            field: 'pricePerQantity'
        },
        totalPrice: {
            type: Sequelize.FLOAT,
            field: 'totalPrice'
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            default: true
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            default: false
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
    Carts.removeAttribute('id');
    return Carts;
};