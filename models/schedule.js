module.exports = function(sequelize, DataTypes) {
    var Schedule = sequelize.define("Schedule", {
        EmployeeNum: DataTypes.INTEGER,
        Day1: DataTypes.STRING,
        Day2: DataTypes.STRING,
        Day3: DataTypes.STRING,
        Day4: DataTypes.STRING,
        Day5: DataTypes.STRING,
        Day6: DataTypes.STRING,
        Day7: DataTypes.STRING,
        Day8: DataTypes.STRING,
        Day9: DataTypes.STRING,
        Day10: DataTypes.STRING,
        Day11: DataTypes.STRING,
        Day12: DataTypes.STRING,
        Day13: DataTypes.STRING,
        Day14: DataTypes.STRING
    });
  
    return Schedule;
  };