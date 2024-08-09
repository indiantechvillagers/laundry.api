module.exports = (sequelize, Sequelize) => {
    const ContactUs = sequelize.define("ContactUs", {
        contactUsId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        Name: {
            type: Sequelize.STRING(500),
            field: 'contactUsName'
        },
        Email: {
            type: Sequelize.STRING(500),
            field: 'contactUsEmail'
        },
        Phone: {
            type: Sequelize.STRING(500),
            field: 'contactUsPhone'
        },
        Message: {
            type: Sequelize.TEXT,
            field: 'contactUsMessage'
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
    ContactUs.removeAttribute('id');
    return ContactUs;
};