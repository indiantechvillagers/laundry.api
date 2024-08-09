module.exports = (sequelize, Sequelize) => {
    const RoleModules = sequelize.define("RoleModules", {
        roleModuleId: {
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
    RoleModules.removeAttribute('id');
    return RoleModules;
};