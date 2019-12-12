module.exports = function(sequelize, DataTypes) {
    var Request = sequelize.define("Request", {
        EmployeeNum: DataTypes.STRING,
        Date : DataTypes.STRING
    });
  
    return Request;
  };
  