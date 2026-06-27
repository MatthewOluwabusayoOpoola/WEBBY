// Single source of truth for the API base URL.
// Override with REACT_APP_API_URL in .env for local dev against a different backend.
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://webbybackend.onrender.com";
