import { Router } from "express";

const router = Router();

/**
 * ⚠️ Exemple de données statiques.
 * Si tu as une base de données, remplace ces tableaux par tes requêtes SQL/ORM
 * mais garde les noms de champs renvoyés pour matcher le frontend.
 */
const ARTISANS = [
  // id + id_artisan + divers alias → pour être compatibles avec l’ancien/front
  {
    id: 1,
    id_artisan: 1,
    name: "Plombier Martin",
    nom: "Plombier Martin",
    rating: 4.8,
    note: 4.8,
    city: "Grenoble",
    ville: "Grenoble",
    speciality: { name: "Plomberie" },
    specialite: "Plomberie",
    category: { slug: "batiment", name: "Bâtiment" },
    categorySlug: "batiment",
    about: "Dépannage rapide et installation.",
    website: null,
    site_web: null,
    featured: true,
    createdAt: "2025-11-05T11:33:08Z",
  },
  {
    id: 2,
    id_artisan: 2,
    name: "Dupont Bâtiment",
    nom: "Dupont Bâtiment",
    rating: 4.5,
    note: 4.5,
    city: "Lyon",
    ville: "Lyon",
    speciality: { name: "Maçonnerie" },
    specialite: "Maçonnerie",
    category: { slug: "batiment", name: "Bâtiment" },
    categorySlug: "batiment",
    about: "Gros œuvre & rénovation.",
    website: null,
    site_web: null,
    featured: true,
    createdAt: "2025-11-05T11:33:08Z",
  },
  {
    id: 3,
    id_artisan: 3,
    name: "Salon Élégance",
    nom: "Salon Élégance",
    rating: 4.2,
    note: 4.2,
    city: "Clermont-Ferrand",
    ville: "Clermont-Ferrand",
    speciality: { name: "Coiffure" },
    specialite: "Coiffure",
    category: { slug: "services", name: "Services" },
    categorySlug: "services",
    about: "Coiffure & soins.",
    website: null,
    site_web: null,
    featured: true,
    createdAt: "2025-11-05T11:33:08Z",
  },
  {
    id: 4,
    id_artisan: 4,
    name: "Boulangerie du Parc",
    nom: "Boulangerie du Parc",
    rating: 4.9,
    note: 4.9,
    city: "Annecy",
    ville: "Annecy",
    speciality: { name: "Boulangerie" },
    specialite: "Boulangerie",
    category: { slug: "alimentation", name: "Alimentation" },
    categorySlug: "alimentation",
    about: "Pains et viennoiseries artisanales.",
    featured: false,
  },
];

/** Normalisation utilitaire */
function normalize(a) {
  return {
    id: a.id ?? a.id_artisan,
    id_artisan: a.id_artisan ?? a.id,
    nom: a.nom ?? a.name ?? "—",
    note: a.note ?? a.rating ?? 0,
    ville: a.ville ?? a.city ?? "—",
    specialite:
      a.specialite ?? a?.speciality?.name ?? a?.Specialty?.name ?? "—",
    about: a.about ?? "",
    site_web: a.site_web ?? a.website ?? "",
    categorySlug: a.categorySlug ?? a?.category?.slug ?? "",
  };
}

/**
 * GET /api/artisans
 * Option : ?category=alimentation|batiment|fabrication|services
 */
router.get("/", (req, res) => {
  const { category } = req.query;
  let list = ARTISANS;

  if (category) {
    const slug = String(category).toLowerCase();
    list = list.filter(
      (a) =>
        a.categorySlug?.toLowerCase() === slug ||
        a.category?.slug?.toLowerCase() === slug
    );
  }

  res.json(list.map(normalize));
});

/** GET /api/artisans/featured → artisans du mois */
router.get("/featured", (req, res) => {
  const featured = ARTISANS.filter((a) => a.featured).map(normalize);
  res.json(featured);
});

/** ✅ GET /api/artisans/top → top 3 par note */
router.get("/top", (req, res) => {
  const top = [...ARTISANS]
    .sort((a, b) => (b.note ?? b.rating ?? 0) - (a.note ?? a.rating ?? 0))
    .slice(0, 3)
    .map(normalize);
  res.json(top);
});

/** GET /api/artisans/:id → fiche */
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const found = ARTISANS.find((a) => a.id === id || a.id_artisan === id);
  if (!found) return res.status(404).json({ error: "Artisan introuvable" });
  res.json(normalize(found));
});

export default router;
