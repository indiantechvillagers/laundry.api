module.exports = (sequelize, Sequelize) => {
    const SlotUsageStory = sequelize.define("SlotUsageStory", {
        slotUsageId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        date: {
            type: Sequelize.STRING(255),
            field: 'date'
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            field: 'isDeleted',
            default: false
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            default: true
        },
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    SlotUsageStory.removeAttribute('id');
    return SlotUsageStory;
};