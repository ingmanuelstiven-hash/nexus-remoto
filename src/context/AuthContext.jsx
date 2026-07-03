"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiEndpoints } from "@/lib/apiEndpoints";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  // 🔹 hidrata sesión
  useEffect(() => {
    try {
      const saved = localStorage.getItem("user");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.id) setUser(parsed);
        else localStorage.removeItem("user");
      }
    } catch {
      localStorage.removeItem("user");
    } finally {
      setMounted(true);
    }
  }, []);

  // 🔥 LOGIN basado en dataset
  const login = async (correo, contrasena) => {
    try {
      const res = await apiEndpoints.getUsers();
      console.log("API RESPONSE:", res);

      // 🔥 normalización robusta
      let users = [];
      if (Array.isArray(res)) users = res;
      else if (Array.isArray(res?.data)) users = res.data;
      else if (Array.isArray(res?.users)) users = res.users;
      else if (res && typeof res === "object") users = [res];

      if (!users.length) {
        throw new Error("No hay usuarios");
      }

      // 🔥 comparación segura
      const foundUser = users.find((u) => {
        const email = (u.correo || u.email || "").trim().toLowerCase();
        const pass = (u.contrasena || u.password || "").trim();

        return (
          email === correo.trim().toLowerCase() &&
          pass === contrasena.trim()
        );
      });

      if (!foundUser) {
        throw new Error("Credenciales incorrectas");
      }

      // 🔥 sin contraseña
      const safeUser = {
        id: foundUser.id,
        nombre: foundUser.nombre || "Usuario",
        correo: foundUser.correo || foundUser.email,
      };

      setUser(safeUser);
      localStorage.setItem("user", JSON.stringify(safeUser));

      return safeUser;

    } catch (err) {
      console.error("Login error:", err);
      throw new Error("Correo o contraseña incorrectos");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        mounted,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);