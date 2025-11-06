export default function StarRating({ rating = 0, max = 5 }) {
  const r = Math.round(Number(rating) || 0);
  const full = "★".repeat(Math.min(r, max));
  const empty = "☆".repeat(Math.max(0, max - r));
  return <span aria-label={`${r} sur ${max}`}>{full}{empty}</span>;
}
