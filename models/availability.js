module.exports = function(sequelize, DataTypes) {
  var Availability = sequelize.define("Availability", {
    EmployeeNum: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    sunday: DataTypes.STRING,
    monday: DataTypes.STRING,
    tuesday: DataTypes.STRING,
    wednesday: DataTypes.STRING,
    thursday: DataTypes.STRING,
    friday: DataTypes.STRING,
    saturday: DataTypes.STRING,
    RequestStatus: DataTypes.STRING
  });

  Availability.associate = models => {
    Availability.belongsTo(models.Employee, { foreignKey: "EmployeeNum" });
  };

  return Availability;
};
