module.exports = (sequelize, Sequelize) => {
    const Banners = sequelize.define("Banners", {
        bannerId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        bannerName: {
            type: Sequelize.STRING(255),
            field: 'BannerName',
            allowNull: false
        },
        image: {
            type: Sequelize.STRING(500),
            field: 'image',
            allowNull: false
        },
        bannerStatus: {
            type: Sequelize.BOOLEAN,
            field: 'BannerStatus'
        },
        serial: {
            type: Sequelize.INTEGER,
            field: 'Serial'
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            field: 'IsActive',
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
        timestamps: true,
        hooks: {
            beforeCreate: async (data, options) => {
                if (!data.serial) {
                    // Find the highest existing serial value
                    const highestSerial = await Banners.max('serial');
                    // Increment it by one
                    data.serial = highestSerial ? highestSerial + 1 : 1;
                }
            }
        }
    });
    Banners.removeAttribute('id');
    return Banners;
};