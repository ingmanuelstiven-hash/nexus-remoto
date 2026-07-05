
const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // En el navegador usamos rutas relativas
    return "/api";
  }
  // En el servidor (SSR) necesitamos la URL absoluta
  const appBaseUrl = process.env.APP_BASE_URL || "http://localhost:3000";
  return `${appBaseUrl}/api`;
};

export async function apiClient(endpoint, options = {}) {
  const url = `${getBaseUrl()}${endpoint}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", // Para tener datos frescos siempre
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Error de API: ${res.status}`);
  }

  return res.json();
}