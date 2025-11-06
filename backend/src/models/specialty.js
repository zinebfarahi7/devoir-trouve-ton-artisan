import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define("Specialty", {
    name: { type: DataTypes.STRING, allowNull: false },
  });
