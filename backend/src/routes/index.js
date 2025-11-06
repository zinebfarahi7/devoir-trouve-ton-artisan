import { Router } from "express";
import categories from "./categories.js";
import artisans from "./artisans.js";
import contact from "./contact.js";

const r = Router();
r.use("/categories", categories);
r.use("/artisans", artisans);
r.use("/contact", contact);

export default r;
