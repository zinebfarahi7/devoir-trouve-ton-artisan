import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchFromServer } from "../api/apiConfig";
import StarRating from "../components/noteEtoiles";

function normalize(a) {
  return {
    id: a.id ?? a.id_artisan,
    nom: a.nom ?? a.name ?? "—",
    note: a.note ?? a.rating ?? 0,
    ville: a.ville ?? a.city ?? "—",
    specialite: a.specialite ?? a?.speciality?.name ?? "—",
  };
}

const label = (slug) =>
  slug
    ? slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ")
    : "";

export default function ArtisansList() {
  const { slug } = useParams();
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await fetchFromServer(`/artisans?category=${slug}`);
        setItems((Array.isArray(data) ? data : []).map(normalize));
      } catch (e) {
        console.error(e);
        setErr("Impossible de charger les artisans.");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  return (
    <section className="container py-4">
      <h1>Artisans — {label(slug)}</h1>

      {loading && <p>Chargement…</p>}
      {!loading && err && <div className="alert alert-danger">{err}</div>}

      {!loading && !err && items.length === 0 && (
        <p>Aucun artisan pour cette catégorie.</p>
      )}

      {!loading && !err && items.length > 0 && (
        <div className="cards">
          {items.map((a) => (
            <Link key={a.id} to={`/artisan/${a.id}`} className="artisan-card">
              <div className="card-header">
                <h3>{a.nom}</h3>
              </div>
              <div className="card-body">
                <p><strong>Note :</strong> <StarRating rating={a.note} /></p>
                <p><strong>Spécialité :</strong> {a.specialite}</p>
                <p><strong>Ville :</strong> {a.ville}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
