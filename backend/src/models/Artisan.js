import { DataTypes } from "sequelize";
export default (sequelize) =>
  sequelize.define("Artisan", {
    name:        { type: DataTypes.STRING, allowNull: false },
    rating:      { type: DataTypes.FLOAT,  allowNull: false, defaultValue: 0 },
    city:        { type: DataTypes.STRING, allowNull: false },
    about:       { type: DataTypes.TEXT },
    website:     { type: DataTypes.STRING },
    imageUrl:    { type: DataTypes.STRING },
    email:       { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
    featured:    { type: DataTypes.BOOLEAN, defaultValue: false }, // “artisan du mois”
  });
