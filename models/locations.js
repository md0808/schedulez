module.exports = (sequelize, DataTypes) => {
    var Location = sequelize.define("Location", {
        LocationNum: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        CompanyNum: DataTypes.INTEGER,
        Address: DataTypes.STRING,
        City: DataTypes.STRING,
        State: DataTypes.STRING,
        Zipcode: DataTypes.STRING,
        Country: DataTypes.STRING,
        OpeningTime: DataTypes.STRING,
        ClosingTime: DataTypes.STRING
    });
  
        // Location.associate = (models) => {
        //     Location.belongsTo(models.Company, {
        //         foreignKey: {
        //             allowNull: false
        //         }
        //     });
        // };

    return Location;
  };
  