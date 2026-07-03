import { apiEndpoints } from "@/lib/apiEndpoints";

export const storeService = {

  // 🔹 DATA COMPLETA (dashboard, etc)
  async getInitialData(userId = 1) {
    const [librosRes, topRes, coworkingRes, purchasesRes] =
      await Promise.allSettled([
        apiEndpoints.getProductos(),
        apiEndpoints.getTop10(),
        apiEndpoints.getCoworkingSpaces(),
        apiEndpoints.getPurchasedItems(userId)
      ]);

    return {
      libros: librosRes.status === "fulfilled" ? librosRes.value : [],
      top10: topRes.status === "fulfilled" ? topRes.value : [],
      coworking: coworkingRes.status === "fulfilled" ? coworkingRes.value : [],
      purchases:
        purchasesRes.status === "fulfilled" &&
        purchasesRes.value?.compras
          ? purchasesRes.value.compras
          : []
    };
  },

  // 🔥 NUEVO MÉTODO CLAVE (para Library)
  async getLibros(filters = {}) {

    // TOP 10
    if (filters.top === "top10") {
      return await apiEndpoints.getTop10();
    }

    // limpiar filtros vacíos
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v)
    );

    const hasFilters = Object.keys(cleanFilters).length > 0;

    // sin filtros → catálogo completo
    if (!hasFilters) {
      return await apiEndpoints.getProductos();
    }

    return await apiEndpoints.getLibrosFiltrados(cleanFilters);
  },

  // 🔹 DETALLE DE LIBRO
  async getLibroById(id) {
    return await apiEndpoints.getLibroPorId(id);
  },

  // 🔹 HISTORIAL DE COMPRAS
  async getPurchases(userId) {
    const res = await apiEndpoints.getPurchasedItems(userId);
    if (res && res.compras) return res.compras;
    if (Array.isArray(res)) return res;
    return [];
  }
};