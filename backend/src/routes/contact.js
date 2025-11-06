import { Router } from "express";
import nodemailer from "nodemailer";
import { body, validationResult } from "express-validator";
import { Artisan } from "../models/index.js";

const r = Router();

const rules = [
  body("name").trim().isLength({ min: 2 }),
  body("email").isEmail(),
  body("subject").trim().isLength({ min: 3 }),
  body("message").trim().isLength({ min: 10 }),
  body("artisanId").isInt(),
];

r.post("/", rules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const artisan = await Artisan.findByPk(req.body.artisanId);
  if (!artisan) return res.sendStatus(404);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"Trouve ton artisan" <${process.env.SMTP_USER}>`,
    to: artisan.email,
    replyTo: req.body.email,
    subject: `[${artisan.name}] ${req.body.subject}`,
    text: `De: ${req.body.name} <${req.body.email}>\n\n${req.body.message}`,
  });

  res.json({ ok: true });
});

export default r;
