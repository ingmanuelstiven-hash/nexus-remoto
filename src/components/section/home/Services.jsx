'use client';

import { useEffect, useState } from "react";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";

function Services() {
  const header = useScrollAnimation();
  const list = useScrollAnimation();

  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [played, setPlayed] = useState(false);

  const services = [
    {
      title: "Librería Universitaria",
      desc: "Material académico y literario para apoyar tu aprendizaje y proyectos.",
      image: "/img/home-services/1.jpg",
    },
    {
      title: "Espacios de Coworking",
      desc: "Áreas modernas y tranquilas para estudiar, crear y trabajar cómodamente.",
      image: "/img/home-services/2.jpg",
    },
    {
      title: "Eventos",
      desc: "Charlas, talleres y actividades que impulsan tu desarrollo y creatividad.",
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
          Servicios Principales
        </h2>
        <p className="mt-3 text-slate-600 max-w-2xl animate-fade-up stagger-1">
          Elige cómo quieres aprender, crear y conectar en Nexus.
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
                  <button
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
                  </button>
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