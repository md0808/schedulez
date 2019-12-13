module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define("Company", {
    Name: DataTypes.STRING
  });

  return Company;
};
