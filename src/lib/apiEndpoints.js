import { apiClient } from "./apiClient";

export const apiEndpoints = {
  // 🔥 usamos dataset real, NO /login
  getUsers: () => apiClient("/users"),

  getProductos: () => apiClient(`/itemslib`),

  getLibrosFiltrados: (filtros = {}) => {
    const clean = Object.fromEntries(
      Object.entries(filtros).filter(([_, v]) => v)
    );
    const params = new URLSearchParams(clean).toString();
    return apiClient(`/itemslib?${params}`);
  },

  getLibroPorId: (id) => apiClient(`/itemslib/${id}`),

  getTop10: () => apiClient(`/itemslib/top10?masVendido=true`),

  getCoworkingSpaces: () => apiClient(`/coworkingnew/spaces`),

  getPurchasedItems: (id) => apiClient(`/compras?userId=${id}`),
};