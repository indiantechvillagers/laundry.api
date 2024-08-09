const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("Users", {
        userId: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(255),
            field: 'Name'
        },
        email: {
            type: Sequelize.STRING(255),
            field: 'email',
            unique: {
                name: 'unique_email' // Specify a specific name for the unique index
            }
        },
        password: {
            type: Sequelize.STRING,
            field: 'password'
        },
        phone: {
            type: Sequelize.STRING,
            field: 'phone'
        },
        dob: {
            type: Sequelize.STRING(25),
            field: 'dob'
        },
        gender: {
            type: Sequelize.STRING(25),
            field: 'gender'
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
    Users.removeAttribute('id');


    // Hash the password before saving the user to the database
    Users.beforeCreate(async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    });

    // Method to compare the provided password with the stored hashed password
    // Users.prototype.comparePassword = async function (password) {
    //     return bcrypt.compare(password, this.password);
    // };
    Users.prototype.comparePassword = async function (password) {
        return bcrypt.compare(password, this.password);
    };

    return Users;
};