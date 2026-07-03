const BASE_URL = "https://mock.apidog.com/m1/1129812-1121696-default";

export async function apiClient(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", // 🔥 evita cache de Apidog
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `API Error: ${res.status}`);
  }

  return res.json();
}