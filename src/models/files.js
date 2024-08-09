module.exports = (sequelize, Sequelize) => {
    const Files = sequelize.define("Files", {
        fileId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        baseurl: {
            type: Sequelize.STRING(500),
            field: 'baseurl'
        },
        filename: {
            type: Sequelize.STRING,
            field: 'filename'
        },
        mimetype: {
            type: Sequelize.STRING,
            field: 'mimetype'
        },
        fileurl: {
            type: Sequelize.STRING(500),
            field: 'fileurl'
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
    Files.removeAttribute('id');
    return Files;
};