"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function DashboardClient({
  totalLibros,
  espaciosDisponibles,
}) {
  const router = useRouter();

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14
        min-h-[68vh]
      "
    >
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-500 mb-2">
          Panel principal
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-950">
          Bienvenido a Nexus
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Gestiona tu lectura, compras y espacios de coworking desde un solo lugar.
        </p>
      </div>

      <div
        className="
          grid gap-6
          grid-cols-1 md:grid-cols-2 lg:grid-cols-4
          auto-rows-[minmax(180px,auto)]
        "
      >
        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="
            relative overflow-hidden
            rounded-3xl border border-slate-200
            bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800
            p-6 sm:p-8
            text-white shadow-sm
            md:col-span-2 md:row-span-2
          "
        >
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-yellow-300/20 blur-2xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 flex h-full flex-col justify-between gap-10">
            <div>
              <span className="inline-flex rounded-full bg-yellow-300 px-3 py-1 text-xs font-bold text-slate-950">
                Nexus Universitario
              </span>

              <h2 className="mt-5 text-3xl sm:text-4xl font-bold leading-tight">
                Todo tu ecosistema académico en un solo panel
              </h2>

              <p className="mt-4 max-w-xl text-sm sm:text-base text-slate-300">
                Accede rápidamente a la librería, consulta espacios disponibles
                y gestiona tus compras o reservas desde esta vista.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Stat label="Libros disponibles" value={totalLibros} />
              <Stat label="Espacios libres" value={espaciosDisponibles} />
              <Stat label="Año fiscal" value="2026" />
            </div>
          </div>
        </motion.section>

        {/* CARDS */}
        <Card
          delay={0.2}
          icon="📚"
          title="Librería"
          description="Explora libros, revistas, categorías y más vendidos."
          action="Ir a librería"
          onClick={() => router.push("/library")}
        />

        <Card
          delay={0.3}
          icon="🏢"
          title="Coworking"
          description="Consulta espacios disponibles y realiza reservas."
          action="Ver espacios"
          onClick={() => router.push("/coworking")}
        />

        <Card
          delay={0.4}
          icon="👤"
          title="Mi cuenta"
          description="Revisa tu perfil, actividad y opciones personales."
          action="Ver cuenta"
          onClick={() => router.push("/account")}
        />
      </div>
    </motion.main>
  );
}

/* COMPONENTES */

function Stat({ label, value }) {
  return (
    <div
      className="
        rounded-2xl border border-white/10
        bg-white/10 px-4 py-4
        backdrop-blur-sm
      "
    >
      <strong className="block text-2xl sm:text-3xl font-bold text-white">
        {value}
      </strong>
      <p className="mt-1 text-xs sm:text-sm text-slate-300">
        {label}
      </p>
    </div>
  );
}

function Card({ icon, title, description, action, onClick, delay }) {
  return (
    <motion.section
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="
        group flex min-h-[210px] flex-col justify-between
        rounded-3xl border border-slate-200
        bg-white p-6 shadow-sm
        cursor-pointer transition-all duration-300
        hover:border-yellow-300 hover:shadow-xl
      "
    >
      <div>
        <div
          className="
            mb-5 flex h-12 w-12 items-center justify-center
            rounded-2xl bg-yellow-100 text-2xl
            transition-transform duration-300
            group-hover:scale-110
          "
        >
          {icon}
        </div>

        <h2 className="text-xl font-bold text-slate-950">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-950">
          {action}
        </span>
        <span
          className="
            flex h-9 w-9 items-center justify-center
            rounded-full bg-slate-950 text-white
            transition-all duration-300
            group-hover:bg-yellow-300 group-hover:text-slate-950
            group-hover:translate-x-1
          "
        >
          →
        </span>
      </div>
    </motion.section>
  );
}