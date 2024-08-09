module.exports = (sequelize, Sequelize) => {
    const ReviewRatings = sequelize.define("ReviewRatings", {
        reviewId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        reviews: {
            type: Sequelize.STRING(255),
            field: 'reviews'
        },
        ratings: {
            type: Sequelize.FLOAT,
            field: 'ratings'
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
    ReviewRatings.removeAttribute('id');
    return ReviewRatings;
};