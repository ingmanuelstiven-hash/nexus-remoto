"use client";

import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";

export default function Providers({ children }) {
  return (
    <Auth0Provider>
      <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    </Auth0Provider>
  );
}