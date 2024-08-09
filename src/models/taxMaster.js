module.exports = (sequelize, Sequelize) => {
    const taxMaster = sequelize.define("taxMaster", {
        taxMasterId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        taxName: {
            type: Sequelize.STRING(255),
            field: 'taxName',
            unique: {
                name: 'unique_taxName' // Specify a specific name for the unique index
            }
        },
        amount: {
            type: Sequelize.FLOAT,
            field: 'amount'
        },
        isApplied: {
            type: Sequelize.BOOLEAN,
            default: true
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            default: true
        },
        isDeleted: {
            type: Sequelize.BOOLEAN,
            default: false
        }
    },
        {
            frezeTableName: true,
            caseFile: 'p',
            caseProp: 'C',
            timestamps: true
        });
    taxMaster.removeAttribute('id');
    return taxMaster;
};