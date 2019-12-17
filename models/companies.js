module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define("Company", {
    CompanyNum: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
    Name: DataTypes.STRING
  });

  // Company.associate = (models) => {
  //   Company.hasMany(models.Location, {
  //     onDelete: "cascade"
  //   });
  // };

  return Company;
};
