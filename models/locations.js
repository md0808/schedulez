module.exports = function(sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
        LocationNum: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Company: DataTypes.INTEGER,
        Address: DataTypes.STRING,
        City: DataTypes.STRING,
        State: DataTypes.STRING,
        OpeningTime: DataTypes.STRING,
        ClosingTime: DataTypes.STRING
    });
  
    return Location;
  };
  