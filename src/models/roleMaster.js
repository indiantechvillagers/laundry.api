module.exports = (sequelize, Sequelize) => {
    const RoleMasters = sequelize.define("RoleMasters", {
        roleId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        roleName: {
            type: Sequelize.STRING(255),
            field: 'roleName',
            unique: {
                name: 'unique_roleName' // Specify a specific name for the unique index
            }
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        frezeTableName: true,
        caseFile: 'p',
        caseProp: 'C',
        timestamps: true
    });
    RoleMasters.removeAttribute('id');
    return RoleMasters;
};