module.exports = function (sequelize, DataTypes) {
    var Availability = sequelize.define("Availability", {
        EmployeeNum: DataTypes.INTEGER,
        Sunday: DataTypes.STRING,
        Monday: DataTypes.STRING,
        Tuesday: DataTypes.STRING,
        Wednesday: DataTypes.STRING,
        Thursday: DataTypes.STRING,
        Friday: DataTypes.STRING,
        Saturday: DataTypes.STRING,
        RequestStatus: DataTypes.STRING,
    });

    return Availability;
};
