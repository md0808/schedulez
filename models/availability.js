module.exports = function(sequelize, DataTypes) {
  var Availability = sequelize.define("Availability", {
    EmployeeNum: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    Sunday: DataTypes.STRING,
    Monday: DataTypes.STRING,
    Tuesday: DataTypes.STRING,
    Wednesday: DataTypes.STRING,
    Thursday: DataTypes.STRING,
    Friday: DataTypes.STRING,
    Saturday: DataTypes.STRING,
    RequestStatus: DataTypes.STRING
  });

  Availability.associate = models => {
    Availability.belongsTo(models.Employee, { foreignKey: "EmployeeNum" });
  };

  return Availability;
};
