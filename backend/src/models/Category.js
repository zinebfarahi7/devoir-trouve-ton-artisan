import { DataTypes } from "sequelize";
export default (sequelize) =>
  sequelize.define("Category", {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  });
