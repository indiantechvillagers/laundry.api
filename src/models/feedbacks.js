module.exports = (sequelize, Sequelize) => {
    const Feedbacks = sequelize.define("Feedbacks", {
        feedbackId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        feedbackNotes: {
            type: Sequelize.STRING(500),
            field: 'feedbackNotes'
        },
        isApproved: {
            type: Sequelize.BOOLEAN,
            field: 'isApproved'
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
    Feedbacks.removeAttribute('id');
    return Feedbacks;
};