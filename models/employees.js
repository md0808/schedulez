module.exports = function(sequelize, DataTypes) {
    var Employee = sequelize.define("Employee", {
        EmployeeNum: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        LocationNum: DataTypes.INTEGER,
        CompanyNum: DataTypes.INTEGER,
        Password: DataTypes.STRING,
        Status: DataTypes.STRING,
        Role: DataTypes.STRING,
        PositionType: DataTypes.STRING 
    });
  
    return Employee;
  };
  