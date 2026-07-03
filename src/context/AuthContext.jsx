"use client";

import { createContext, useContext } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Obtenemos los datos del usuario logueado desde el SDK de Auth0
  const { user: auth0User, error, isLoading } = useUser();
  const router = useRouter();

  // Mapeo de campos para mantener compatibilidad con las vistas de la app
  const user = auth0User
    ? {
        id: auth0User.sub,
        nombre: auth0User.name || auth0User.nickname || "Usuario",
        correo: auth0User.email,
        imagen: auth0User.picture,
      }
    : null;

  const login = () => {
    // Ruta interceptada por el proxy de Auth0
    window.location.href = "/auth/login";
  };

  const logout = () => {
    // Ruta interceptada por el proxy de Auth0
    window.location.href = "/auth/logout";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        mounted: !isLoading,
        isAuthenticated: !!user,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);