module.exports = (sequelize, Sequelize) => {
    const NotificationMaster = sequelize.define("NotificationMaster", {
        notificationId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        notificationTitle: {
            type: Sequelize.STRING,
            allowNull: false
        },
        notificationMessage: {
            type: Sequelize.STRING,
            allowNull: false
        },
        notificationType: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        notificationFor: {
            type: Sequelize.STRING(50),
            allowNull: true
        },
        isRead: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        expiryDate: {
            type: Sequelize.DATE
        },
        priority: {
            type: Sequelize.INTEGER
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
    NotificationMaster.removeAttribute('id');
    return NotificationMaster;
};

// In this schema:

// notificationTitle: Title of the notification.
// notificationId: Primary key of the table, auto-incremented.
// userId: Foreign key referencing the userId in the Users table. Assumed to be a required field.
// notificationMessage: Text of the notification message.
// notificationType: Type of the notification, could be email, SMS, etc.
// isRead: Flag indicating whether the notification has been read or not.
// expiryDate: Date and time after which the notification expires.
// priority: Priority level of the notification (e.g., low, medium, high).
