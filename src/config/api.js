export const API_ORIGIN =
  process.env.NEXT_PUBLIC_API_ORIGIN || "http://localhost:5000";

export const API_BASE_URL = `${API_ORIGIN}/api`;

export const toApiUrl = (path = "") => {
  if (!path) return API_ORIGIN;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${API_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
};

export const toApiEndpoint = (path = "") => {
  if (!path) return API_BASE_URL;
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};
