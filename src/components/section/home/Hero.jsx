"use client";

import { useEffect, useState } from "react";
import Slider3D from "@/components/ui/home/Slider3D";

const heroImages = [
  "/img/home-slider/1.jpg",
  "/img/home-slider/2.jpg",
  "/img/home-slider/3.jpg",
];

function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50); // 🔥 evita hydration flicker
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6 grid gap-16 items-center lg:grid-cols-2 md:justify-center">

        {/* TEXTO */}
        <div
          className={`max-w-xl flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* TITLE */}
          <h1
            className={`text-4xl md:text-6xl font-semibold tracking-tight transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "100ms" }} // 🔥 delay real
          >
            Nexus: Tu espacio de aprendizaje y creación
          </h1>

          {/* DESCRIPTION */}
          <p
            className={`text-slate-600 text-lg mt-6 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Libros, coworking y experiencias en un solo lugar.
          </p>

          {/* CTA */}
          <a
            href="#servicios"
            className={`btn-primary w-fit mt-6 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            Explorar servicios
          </a>
        </div>

        {/* SLIDER */}
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <Slider3D images={heroImages} />
        </div>

      </div>
    </section>
  );
}

export default Hero;