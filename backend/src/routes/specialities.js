import { Router } from 'express';
import { Speciality, Category, Artisan } from '../models/index.js';
const r = Router();

// GET /api/specialities?categoryId=1
r.get('/', async (req, res) => {
  const { categoryId } = req.query;
  const where = categoryId ? { categoryId } : {};
  const data = await Speciality.findAll({
    where,
    include: [
      { model: Category, as: 'category', attributes: ['id', 'name'] },
      { model: Artisan, as: 'artisans' }
    ]
  });
  res.json(data);
});

export default r;
