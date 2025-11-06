import "dotenv/config";
import { Sequelize } from "sequelize";
import ArtisanModel from "./artisan.js";
import CategoryModel from "./category.js";
import SpecialtyModel from "./specialty.js";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  { host: process.env.DB_HOST, dialect: "mysql", logging: false }
);

export const Category = CategoryModel(sequelize);
export const Specialty = SpecialtyModel(sequelize);
export const Artisan  = ArtisanModel(sequelize);

// Associations
Category.hasMany(Specialty, { onDelete: "CASCADE" });
Specialty.belongsTo(Category);

Specialty.hasMany(Artisan, { onDelete: "CASCADE" });
Artisan.belongsTo(Specialty);

export const initDb = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
};
