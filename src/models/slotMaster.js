module.exports = (sequelize, Sequelize) => {
    const SlotMaster = sequelize.define("SlotMaster", {
        slotId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        day: {
            type: Sequelize.STRING(255),
            field: 'day'
        },
        time: {
            type: Sequelize.STRING(255),
            field: 'time',
        },
        slotLimit: {
            type: Sequelize.INTEGER,
            field: 'slotLimit'
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
        timestamps: true,
        // Define composite unique constraint for 'day' and 'time'
        uniqueKeys: {
            unique_day_time: {
                fields: ['day', 'time']
            }
        }
    });
    SlotMaster.removeAttribute('id');
    return SlotMaster;
};