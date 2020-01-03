module.exports = function (sequelize, DataTypes) {
    var Request = sequelize.define("Request", {
        EmployeeNum: DataTypes.STRING,
        DateRequested: DataTypes.STRING,
        Message: DataTypes.CHAR,
        IsApproved: DataTypes.BOOLEAN,
        IsDenied: DataTypes.BOOLEAN,

    });

    return Request;
};
