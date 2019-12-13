module.exports = function(sequelize, DataTypes) {
    var Employee = sequelize.define("Employee", {
        Location: DataTypes.INTEGER,
        Company: DataTypes.INTEGER,
        Password: DataTypes.STRING,
        Status: DataTypes.STRING,
        Role: DataTypes.STRING,
        PositionType: DataTypes.STRING 
    });
  
    return Employee;
  };
  