module.exports = (sequelize, Sequelize) => {
    const OrderStatusChangeLogs = sequelize.define("OrderStatusChangeLogs", {
        statusChangeLogId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        notes: {
            type: Sequelize.TEXT,
            field: 'notes'
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    OrderStatusChangeLogs.removeAttribute('id');
    return OrderStatusChangeLogs;
};