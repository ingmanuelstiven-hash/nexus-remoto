// src/components/layout/ProtectedLayout.jsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/ui/Loader";
import { useLoader } from "@/hooks/useLoader";
import { useI18n } from "@/context/TranslationsProvider";

export default function ProtectedLayout({ children }) {
  const { user, mounted } = useAuth();
  const router = useRouter();
  const t = useI18n();

  const { isLoading, startLoading, stopLoading } = useLoader(true);

  useEffect(() => {
    if (!mounted) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    startLoading(300);

  }, [mounted, user]);

  useEffect(() => {
    if (mounted) {
      stopLoading();
    }
  }, [mounted]);


  if (!mounted) return null;

  if (isLoading) {
    return <Loader text={t.loading.session} />;
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