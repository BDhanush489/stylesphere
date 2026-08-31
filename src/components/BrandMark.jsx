// Renders a brand's real logo when we have one (ClothHive), otherwise a
// typographic monogram in the brand's accent color — an honest placeholder
// until real brand marks are supplied for the others.
export default function BrandMark({ brand, size = 56, className = "" }) {
  if (brand.logo) {
    return (
      <img
        src={brand.logo}
        alt={`${brand.name} logo`}
        style={{ width: size, height: size }}
        className={`rounded-full object-cover flex-shrink-0 ${className}`}
      />
    );
  }

  const initials = brand.name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      style={{ width: size, height: size, backgroundColor: brand.accent }}
      className={`rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ${className}`}
    >
      <span style={{ fontSize: size * 0.38 }}>{initials}</span>
    </div>
  );
}
