import { apiClient } from "./apiClient";

// Definición de todas las rutas de API del proyecto
export const apiEndpoints = {
  // Lista de usuarios registrada en la BD
  getUsers: () => apiClient("/users"),

  // Catálogo completo de libros
  getProductos: () => apiClient(`/itemslib`),

  // Libros filtrados por categoría o año
  getLibrosFiltrados: (filtros = {}) => {
    const clean = Object.fromEntries(
      Object.entries(filtros).filter(([_, v]) => v)
    );
    const params = new URLSearchParams(clean).toString();
    return apiClient(`/itemslib?${params}`);
  },

  // Obtener un libro por su ID único
  getLibroPorId: (id) => apiClient(`/itemslib/${id}`),

  // Libros más vendidos (Top 10)
  getTop10: () => apiClient(`/itemslib?masVendido=true`),

  // Espacios de coworking disponibles
  getCoworkingSpaces: () => apiClient(`/coworkingnew/spaces`),

  // Historial de compras de un usuario (acepta ID o Correo de Auth0)
  getPurchasedItems: (id, email) => apiClient(`/compras?userId=${id}&email=${email || ''}`),
};