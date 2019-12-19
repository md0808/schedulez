module.exports = (sequelize, DataTypes) => {
    var Location = sequelize.define("Location", {
        CompanyNum: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        Address: DataTypes.STRING,
        City: DataTypes.STRING,
        State: DataTypes.STRING,
        Zipcode: DataTypes.STRING,
        Country: DataTypes.STRING,
        OpeningTime: DataTypes.STRING,
        ClosingTime: DataTypes.STRING
    });

    Location.associate = (models) => {
        Location.belongsTo(models.Company, {foreignKey: "CompanyNum"});
    };

    return Location;
};
