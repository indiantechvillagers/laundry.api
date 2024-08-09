module.exports = (sequelize, Sequelize) => {
    const Testimonials = sequelize.define("Testimonials", {
        testimonialId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        authorName: {
            type: Sequelize.STRING(255),
            field: 'authorName'
        },
        notes: {
            type: Sequelize.TEXT,
            field: 'notes',
        },
        showInUI: {
            type: Sequelize.BOOLEAN,
            field: 'showInUI'
        },
        isApproved: {
            type: Sequelize.BOOLEAN,
            field: 'isApproved'
        },
        serial: {
            type: Sequelize.STRING(255),
            field: 'serial'
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
        hooks: {
            beforeCreate: async (data, options) => {
                if (!data.serial) {
                    // Find the highest existing serial value
                    const highestSerial = await Testimonials.max('serial');
                    // Increment it by one
                    data.serial = highestSerial ? highestSerial + 1 : 1;
                }
            }
        }
    });
    Testimonials.removeAttribute('id');
    return Testimonials;
};