// backend/src/routes/categories.js
import express from "express";
import { Category } from "../models/index.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const rows = await Category.findAll({
      attributes: ["id", "name", "slug"],
      order: [["name", "ASC"]],
    });
    res.json(rows);
  } catch (err) {
    console.error("GET /api/categories error:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
