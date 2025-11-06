import { Category, Speciality, Artisan, syncDb } from '../models/index.js';

export const seed = async () => {
  await syncDb();

  const cat1 = await Category.create({ name: 'Bâtiment' });
  const cat2 = await Category.create({ name: 'Services' });
  const cat3 = await Category.create({ name: 'Fabrication' });
  const cat4 = await Category.create({ name: 'Alimentation' });

  const sp1 = await Speciality.create({ name: 'Plomberie', categoryId: cat1.id });
  const sp2 = await Speciality.create({ name: 'Électricité', categoryId: cat1.id });
  const sp3 = await Speciality.create({ name: 'Ménage', categoryId: cat2.id });

  await Artisan.bulkCreate([
    { name: 'Dupont Plombier', rating: 4.5, city: 'Lyon', specialityId: sp1.id, about: 'Interventions rapides', website: '' },
    { name: 'ElectroPro', rating: 4.0, city: 'Grenoble', specialityId: sp2.id, about: 'Installations complètes', website: '' },
    { name: 'Clean&Co', rating: 3.8, city: 'Clermont-Ferrand', specialityId: sp3.id, about: 'Ménage pro', website: '' }
  ]);
};
