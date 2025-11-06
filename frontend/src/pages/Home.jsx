import { useEffect, useState } from "react";
import { fetchFromServer } from "../api/apiConfig";
import { Link } from "react-router-dom";
import StarRating from "../components/noteEtoiles";
import "../styles/SCSS/pages/home.scss";

function normalize(a) {
  return {
    id: a.id ?? a.id_artisan,
    nom: a.nom ?? a.name ?? "—",
    note: a.note ?? a.rating ?? 0,
    ville: a.ville ?? a.city ?? "—",
    specialite: a.specialite ?? a?.speciality?.name ?? "—",
  };
}

export default function Home() {
  const [topArtisans, setTopArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setErr("");
        setLoading(true);
        const data = await fetchFromServer("/artisans/top");
        const list = Array.isArray(data) ? data.map(normalize) : [];
        setTopArtisans(list);
      } catch (e) {
        console.error(e);
        setErr("Impossible de charger les artisans du mois.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section id="home" className="container">

      {/* Tutoriel */}
      <div className="tuto">
        <h1 className="title_principal">Comment trouver mon artisan ?</h1>
        <ol>
          <li>Choisir la catégorie d'artisanat dans le menu</li>
          <li>Choisir un artisan</li>
          <li>Le contacter via le formulaire de contact</li>
          <li>Une réponse sera apportée sous 48h</li>
        </ol>
      </div>

      {/* Top 3 */}
      <div className="top_artisan">
        <h2 className="title_secondary">Le top 3 des artisans</h2>

        {loading && <p className="muted">Chargement…</p>}
        {!loading && err && (
          <div className="alert alert-danger">{err}</div>
        )}

        {!loading && !err && topArtisans.length === 0 && (
          <p className="muted">Aucun artisan à afficher.</p>
        )}

        {!loading && !err && topArtisans.length > 0 && (
          <div className="cards">
            {topArtisans.map((a) => (
              <Link
                key={a.id}
                to={`/artisan/${a.id}`}
                className="artisan-card"
              >
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
      </div>
    </section>
  );
}
