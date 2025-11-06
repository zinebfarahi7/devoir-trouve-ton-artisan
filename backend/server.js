import express from "express";
import cors from "cors";
import artisanRoutes from "./src/routes/artisans.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
    ],
    credentials: true,
  })
);

/** Routes API */
app.use("/api/artisans", artisanRoutes);

/** Page d’index simple avec des liens de test */
app.get("/", (req, res) => {
  res.send(
    `API Trouve ton artisan ✅ • <a href="/api/artisans">/api/artisans</a> • <a href="/api/artisans/featured">/api/artisans/featured</a> • <a href="/api/artisans/top">/api/artisans/top</a>`
  );
});

app.listen(PORT, () => {
  console.log(`API sur http://localhost:${PORT}`);
});
