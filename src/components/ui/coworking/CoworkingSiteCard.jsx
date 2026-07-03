function CoworkingSiteCard({ space, onClick }) {
  if (!space) return null;

  const estaOcupado = space.ocupado;

  return (
    <article
      onClick={onClick}
      className="
        relative glass-card p-5 border border-slate-200 rounded-2xl
        flex flex-col gap-4
        cursor-pointer
        transition-all duration-200
        hover:-translate-y-1 hover:shadow-xl
        group
      "
    >
      {/* STATUS BADGE (top-right) */}
      <span
        className={`
          absolute top-4 right-4
          text-xs font-semibold px-3 py-1 rounded-full
          ${estaOcupado
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-600"}
        `}
      >
        {estaOcupado ? "Ocupado" : "Disponible"}
      </span>

      {/* HEADER */}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">
          {space.nombre}
        </h3>

        <span className="text-xs text-text-secondary capitalize">
          {space.ubicacion}
        </span>
      </div>

      {/* TIPO */}
      <span className="
        text-xs font-medium
        px-3 py-1 rounded-full w-fit
        bg-brand-100 text-brand-700
      ">
        {space.tipo}
      </span>

      {/* INFO */}
      <ul className="text-sm text-text-primary space-y-1">
        <li>👥 {space.capacidad} personas</li>
      </ul>

      {/* DIVIDER */}
      <div className="h-px bg-border-default" />

      {/* CTA */}
      <button
        className={`
          mt-auto text-sm font-semibold py-2 rounded-md transition
          ${estaOcupado
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "btn-primary"}
        `}
        onClick={(e) => {
          e.stopPropagation();
          if (!estaOcupado) onClick?.();
        }}
        disabled={estaOcupado}
      >
        {estaOcupado ? "No disponible" : "Reservar"}
      </button>

      {/* HOVER OVERLAY (micro UX 🔥) */}
      <div className="
        absolute inset-0
        bg-black/0 group-hover:bg-black/5
        transition
        rounded-xl
        pointer-events-none
      " />
    </article>
  );
}

export default CoworkingSiteCard;