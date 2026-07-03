// src/components/layout/ProtectedLayout.jsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/ui/Loader";
import { useLoader } from "@/hooks/useLoader";

export default function ProtectedLayout({ children }) {
  const { user, mounted } = useAuth();
  const router = useRouter();

  const { isLoading, startLoading, stopLoading } = useLoader(true);

  useEffect(() => {
    if (!mounted) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    // loader suave solo cuando ya sabemos estado
    startLoading(300);

  }, [mounted, user]);

  useEffect(() => {
    if (mounted) {
      stopLoading();
    }
  }, [mounted]);

  // 🔥 1. evitar mismatch SSR
  if (!mounted) return null;

  // 🔥 2. loader ya controlado en cliente
  if (isLoading) {
    return <Loader text="Cargando sesión..." />;
  }

  if (!user) return null;

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}