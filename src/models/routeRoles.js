module.exports = (sequelize, Sequelize) => {
    const RouteRoles = sequelize.define("RouteRoles", {
        routeRoleId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
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
    RouteRoles.removeAttribute('id');
    return RouteRoles;
};