module.exports = (sequelize, Sequelize) => {
    const Addresses = sequelize.define("Addresses", {
        addressId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        setDefault: {
            type: Sequelize.BOOLEAN,
            field: 'setDefault'
        },
        name: {
            type: Sequelize.STRING,
            field: 'name'
        },
        phone: {
            type: Sequelize.STRING,
            field: 'phone'
        },
        email: {
            type: Sequelize.STRING,
            field: 'email'
        },
        addressType: {
            type: Sequelize.STRING,
            field: 'addressType'
        },
        address: {
            type: Sequelize.STRING,
            field: 'address'
        },
        landMark: {
            type: Sequelize.STRING,
            field: 'landMark'
        },
        pin: {
            type: Sequelize.STRING,
            field: 'pin'
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
    Addresses.removeAttribute('id');
    return Addresses;
};