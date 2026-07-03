'use client'

import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

function Pricing() {
  const header = useScrollAnimation();
  const cards = useScrollAnimation();
  const summary = useScrollAnimation();

  const [activePlan, setActivePlan] = useState("basic");
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [played, setPlayed] = useState(false);

  const plans = {
    basic: {
      title: "Plan Básico",
      description: "Acceso esencial a la biblioteca.",
      price: "$9",
      period: "/mes",
      books: "2",
      quality: "SD",
      format: "EPUB",
      coworking: "No incluido",
    },
    pro: {
      title: "Plan Pro",
      description: "Para lectores frecuentes.",
      price: "$19",
      period: "/mes",
      books: "5",
      quality: "HD",
      format: "EPUB + PDF",
      coworking: "5 días / mes",
    },
    nexus: {
      title: "Plan Nexus",
      description: "Experiencia premium completa.",
      price: "$39",
      period: "/mes",
      books: "10",
      quality: "4K",
      format: "EPUB + PDF",
      coworking: "Ilimitado",
    },
  };

  useEffect(() => {
    if (!cards.visible || played) return;

    Object.keys(plans).forEach((_, i) => {
      setTimeout(() => {
        setVisibleIndex(i);
      }, i * 120);
    });

    setPlayed(true);
  }, [cards.visible, played, plans]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      {/* ===== HEADER ===== */}
      <header
        ref={header.ref}
        className={`max-w-2xl mb-12 space-y-3 transition-all duration-500 ease-out
          ${header.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        <h2 className="title-h2">
          Planes de Suscripción Nexus
        </h2>
        <p className="text-slate-600">
          Accede a la librería, coworking y contenidos digitales según tu plan.
        </p>
      </header>

      {/* ===== TABS ===== */}
      <div
        ref={cards.ref}
        className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0"
      >
        {Object.entries(plans).map(([key, plan], i) => (
          <article
            key={key}
            onClick={() => setActivePlan(key)}
            className={`
              btn-tab
              transition-all duration-400 ease-out
              ${i <= visibleIndex
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6 pointer-events-none"}
              ${activePlan === key ? "is-active" : ""}
            `}
          >
            <div
              className={`
                price-badge transition-all duration-300
                ${i <= visibleIndex ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                ${activePlan === key
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-700"}
              `}
            >
              {plan.price}
              <span className="text-xs font-normal ml-0.5">
                {plan.period}
              </span>
            </div>

            <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
            <p className="text-sm text-slate-600">{plan.description}</p>
          </article>
        ))}
      </div>

      {/* ===== SUMMARY (PEGADO A LAS TABS) ===== */}
      <aside
        ref={summary.ref}
        className={`rounded-b-2xl rounded-t-2xl md:rounded-t-none border border-border-light relative z-30 bg-slate-200 p-8 space-y-6 shadow-updeep md:-mt-3 mt-3
          transition-all duration-500 ease-out
          ${cards.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        <h4 className="text-lg font-semibold">
          Resumen del plan
        </h4>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <li>
            <span className="text-sm text-slate-500">Libros / mes</span>
            <span
              key={`books-${activePlan}`}
              className="block text-xl font-semibold"
            >
              {plans[activePlan].books}
            </span>
          </li>

          <li>
            <span className="text-sm text-slate-500">Calidad</span>
            <span
              key={`quality-${activePlan}`}
              className="block text-xl font-semibold"
            >
              {plans[activePlan].quality}
            </span>
          </li>

          <li>
            <span className="text-sm text-slate-500">Formato</span>
            <span
              key={`format-${activePlan}`}
              className="block text-xl font-semibold"
            >
              {plans[activePlan].format}
            </span>
          </li>

          <li>
            <span className="text-sm text-slate-500">Coworking</span>
            <span
              key={`coworking-${activePlan}`}
              className="block text-xl font-semibold"
            >
              {plans[activePlan].coworking}
            </span>
          </li>
        </ul>
      </aside>
    </section>
  );
}

export default Pricing;
