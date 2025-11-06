import { initDb, Category, Specialty, Artisan } from "./models/index.js";

const run = async () => {
  await initDb();

  const cats = await Category.bulkCreate([
    { name: "Bâtiment",   slug: "batiment" },
    { name: "Services",   slug: "services" },
    { name: "Fabrication",slug: "fabrication" },
    { name: "Alimentation", slug: "alimentation" },
  ], { ignoreDuplicates: true });

  const [bat, srv, fab, ali] = cats;

  const [maçonnerie, plomberie, coiffure] = await Specialty.bulkCreate([
    { name: "Maçonnerie", CategoryId: bat.id },
    { name: "Plomberie",  CategoryId: bat.id },
    { name: "Coiffure",   CategoryId: srv.id },
  ]);

  await Artisan.bulkCreate([
    { name: "Dupont Bâtiment", rating: 4.5, city: "Lyon", email: "dupont@example.com", SpecialtyId: maçonnerie.id, featured: true },
    { name: "Plombier Martin", rating: 4.8, city: "Grenoble", email: "martin@example.com", SpecialtyId: plomberie.id, featured: true },
    { name: "Salon Élégance",  rating: 4.2, city: "Clermont-Ferrand", email: "elegance@example.com", SpecialtyId: coiffure.id, featured: true },
  ]);
  console.log("Seed OK");
  process.exit(0);
};
run();
