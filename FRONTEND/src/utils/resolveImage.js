/**
 * resolveImage
 * Converts any product image value to a full absolute URL.
 *
 *  - already absolute (https://...)  → returned as-is
 *  - relative /uploads/...            → prepended with backend origin
 *  - null / undefined / ""            → fallback placeholder
 */

const API_ORIGIN =
  (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(
    /\/api$/,
    ""
  );

const FALLBACK =
  "https://via.placeholder.com/300x300?text=No+Image";

export const resolveImage = (image) => {
  if (!image) return FALLBACK;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  // relative path like /uploads/filename.jpg
  return `${API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
};

export const FALLBACK_IMAGE = FALLBACK;
