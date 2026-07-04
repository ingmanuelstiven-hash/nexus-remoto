'use client';

import { useEffect, useState } from "react";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useI18n } from "@/context/TranslationsProvider";

function Services() {
  const t = useI18n();
  const header = useScrollAnimation();
  const list = useScrollAnimation();
  
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [played, setPlayed] = useState(false);

  const services = [
    {
      title: t.services.lib_title,
      desc: t.services.lib_desc,
      image: "/img/home-services/1.jpg",
    },
    {
      title: t.services.cow_title,
      desc: t.services.cow_desc,
      image: "/img/home-services/2.jpg",
      action: {
        label: t.coworking.title,
        path: "/coworking"
      }
    },
    {
      title: t.services.events_title,
      desc: t.services.events_desc,
      image: "/img/home-services/3.jpg",
    },
  ];

  /* 🎼 Staggering real al entrar en viewport */
  useEffect(() => {
    if (!list.visible || played) return;

    services.forEach((_, i) => {
      setTimeout(() => {
        setVisibleIndex(i);
      }, i * 140);
    });

    setPlayed(true);
  }, [list.visible, played, services]);

  /* 🔁 Cambio automático de servicio */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <section id="servicios" className="w-full py-20">
      {/* ===== HEADER ===== */}
      <header
        ref={header.ref}
        className={`max-w-7xl mx-auto px-6 mb-12 transition-all duration-500 ease-out
          ${header.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        <h2 className="title-h2">
          {t.services.title}
        </h2>
        <p className="mt-3 text-slate-600 max-w-2xl animate-fade-up stagger-1">
          {t.services.desc}
        </p>
      </header>

      {/* ===== CONTENEDOR ===== */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl bg-slate-100 p-8 md:p-12 border border-border-light">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ===== IZQUIERDA ===== */}
            <div ref={list.ref} className="grid gap-6">
              {services.map((service, i) => {
                const isVisible = i <= visibleIndex;
                const isActive = i === activeIndex;

                return (
                  <div
                    key={service.title}
                    onClick={() => setActiveIndex(i)}
                    className={`
                      text-left cursor-pointer rounded-2xl p-6 bg-white
                      transition-all duration-500 ease-out
                      ${isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"}
                      ${isActive
                        ? "ring-2 ring-brand-500 shadow-lg"
                        : "hover:-translate-y-1 hover:shadow-xl"}
                    `}
                  >
                    <h3 className="text-lg font-semibold mb-2">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                    {service.action && isActive && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isAuthenticated) {
                            login();
                          } else {
                            router.push(service.action.path);
                          }
                        }}
                        className="
                          mt-4 inline-flex items-center justify-center
                          rounded-xl bg-slate-950 px-5 py-2.5
                          text-sm font-bold text-white
                          transition-all duration-300
                          hover:-translate-y-0.5 hover:bg-yellow-300 hover:text-slate-950 hover:shadow-md
                        "
                      >
                        {service.action.label}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ===== DERECHA – IMAGEN ===== */}
            <div className="relative w-full h-[360px] md:h-[420px] rounded-3xl overflow-hidden bg-slate-200">
              {services.map((service, i) => (
                <img
                  key={service.image}
                  src={service.image}
                  alt={service.title}
                  className={`
                    absolute inset-0 w-full h-full object-cover
                    transition-all duration-700 ease-out
                    ${i === activeIndex
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"}
                  `}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
// FORCE_REBUILD_1783124179835
