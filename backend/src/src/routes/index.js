// /backend/src/server.js
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { initDb } from "./models/index.js";
import router from "./routes/index.js";

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: process.env.FRONT_URL, credentials: false }));
app.use(rateLimit({ windowMs: 60_000, max: 120 }));

app.use("/api", router);

const port = process.env.PORT || 4000;
initDb().then(() => {
  app.listen(port, () => console.log(`API sur http://localhost:${port}`));
});
