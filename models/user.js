module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define("user", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        companyName: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        },

        // eslint-disable-next-line camelcase
        last_login: {
            type: Sequelize.DATE
        },

        status: {
            type: Sequelize.ENUM("active", "inactive"),
            defaultValue: "active"
        }
    });

    return User;
};