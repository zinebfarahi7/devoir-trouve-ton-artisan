import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromServer } from "../api/apiConfig";
import StarRating from "../components/noteEtoiles";
import LogoEntreprise from "../assets/logo.png"; 
import "../styles/SCSS/pages/artisanDetail.scss";

export default function ArtisanDetail() {
  const { id } = useParams();

  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // Form
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sendOk, setSendOk] = useState("");
  const [sendErr, setSendErr] = useState("");

  useEffect(() => {
    let cancel = false;
    async function fetchArtisan() {
      setLoading(true);
      setLoadError("");
      try {
        const data = await fetchFromServer(`/artisans/${id}`);
        if (!cancel) setArtisan(data);
      } catch (e) {
        if (!cancel) setLoadError("Impossible de charger la fiche de l’artisan.");
        console.error("Erreur fetch artisan :", e);
      } finally {
        if (!cancel) setLoading(false);
      }
    }
    fetchArtisan();
    return () => { cancel = true; };
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSendOk("");
    setSendErr("");

    try {
      const res = await fetchFromServer("/contact", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      // Convention: si l’API renvoie {success:true,message:"..."}
      if (res?.success === false) {
        throw new Error(res?.message || "Erreur lors de l’envoi");
      }

      setSendOk(res?.message || "✅ Message envoyé !");
      setFormData({ nom: "", email: "", objet: "", message: "" });
    } catch (err) {
      console.error("Erreur envoi formulaire:", err);
      setSendErr(err?.message || "Une erreur est survenue.");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="container py-4">Chargement…</div>;
  if (loadError) return <div className="container py-4 alert">{loadError}</div>;
  if (!artisan) return <div className="container py-4">Aucun artisan trouvé.</div>;

  // Normalisation des champs (selon ton backend)
  const name = artisan.name || artisan.nom || "—";
  const speciality =
    artisan.speciality?.name || artisan.Specialty?.name || artisan.specialite || "—";
  const city = artisan.city || artisan.ville || "—";
  const about = artisan.about || "—";
  const rating = artisan.rating ?? artisan.note ?? 0;
  const site = artisan.site_web || artisan.website || "";

  return (
    <section className="container artisan-detail">
      <h1 className="page-title">Fiche de l’artisan</h1>

      <div className="fiche-card">
        {/* Header de la carte */}
        <div className="fiche-card__head">
          <img
            src={LogoEntreprise}
            className="fiche-card__logo"
            alt="logo de l'entreprise"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          <h2 className="fiche-card__title">{name}</h2>
        </div>

        {/* Body */}
        <div className="fiche-card__body">
          <ul className="fiche-list">
            <li>
              <strong>Spécialité :</strong> {speciality}
            </li>
            <li>
              <strong>Ville :</strong> {city}
            </li>
            <li>
              <strong>À propos :</strong>
              <p className="mb-0">{about}</p>
            </li>
            <li>
              <strong>Note :</strong> <StarRating rating={rating} />
            </li>
          </ul>

          {/* Formulaire de contact */}
          <div className="contact-block">
            <h3>Formulaire de contact</h3>

            {sendOk && <div className="notice notice--ok">{sendOk}</div>}
            {sendErr && <div className="notice notice--error">{sendErr}</div>}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <label htmlFor="f-nom">Nom</label>
                <input
                  id="f-nom"
                  name="nom"
                  type="text"
                  placeholder="Votre nom…"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="f-email">Email</label>
                <input
                  id="f-email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="f-objet">Objet</label>
                <input
                  id="f-objet"
                  name="objet"
                  type="text"
                  placeholder="Objet de votre demande"
                  value={formData.objet}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="f-message">Message</label>
                <textarea
                  id="f-message"
                  name="message"
                  rows="3"
                  placeholder="Bonjour, je souhaite obtenir un devis…"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="btn" type="submit" disabled={sending}>
                {sending ? "Envoi…" : "Envoyer"}
              </button>
            </form>
          </div>

          {/* Lien externe */}
          <div className="fiche-card__footer">
            <strong>Site web :</strong>{" "}
            {site ? (
              <a href={site} target="_blank" rel="noopener noreferrer">
                {site}
              </a>
            ) : (
              "Non renseigné"
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
