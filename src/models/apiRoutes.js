module.exports = (sequelize, Sequelize) => {
    const API_Routes = sequelize.define("API_Routes", {
        routeId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        routeName: {
            type: Sequelize.STRING(255),
            field: 'routeName',
        },
        method: {
            type: Sequelize.STRING,
            field: 'method'
        },
        uri: {
            type: Sequelize.STRING,
            field: 'uri'
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
    API_Routes.removeAttribute('id');
    return API_Routes;
};