module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define("Company", {
    CompanyNum: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
    Name: DataTypes.STRING
  });

  return Company;
};
