module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define("Company", {
    Name: DataTypes.STRING
  });

  Company.associate = (models) => {
    Company.hasMany(models.Location, {
      onDelete: "cascade"
    });
  };

  return Company;
};
