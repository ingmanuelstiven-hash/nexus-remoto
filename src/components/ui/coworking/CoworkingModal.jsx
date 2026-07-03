"use client";

function CoworkingModal({ space, onClose, onStartBooking }) {
  if (!space) return null;

  const horariosHoy = ["12:00h", "13:00h", "17:00h"];
  const ocupados = space.horariosOcupados || [];
  const normalize = (h) => h.replace("h", "");

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-[#f4f7f9] w-full max-w-3xl rounded-[20px] p-8 md:p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-2xl font-bold opacity-70 hover:opacity-100 text-slate-800"
        >
          ×
        </button>

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-[28px] font-bold text-slate-900 tracking-tight">
            {space.nombre}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-x-12 gap-y-8">
          
          {/* LEFT COL: INFO */}
          <div className="flex flex-col gap-3">
            <InfoItem label="Tipo" value={space.tipo} />
            <InfoItem label="Capacidad" value={`${space.capacidad} personas`} />
            <InfoItem label="Ubicación" value={space.ubicacion} />
            <div className="flex items-center gap-2 border border-slate-400 rounded-xl px-4 py-3.5 bg-transparent">
              <span className="font-bold text-slate-900">Estado:</span>
              <span className={`font-bold ${space.ocupado ? 'text-red-500' : 'text-green-500'}`}>
                {space.ocupado ? 'Ocupado ahora' : 'Disponible'}
              </span>
            </div>
          </div>

          {/* RIGHT COL: HORARIOS */}
          <div className="flex flex-col">
            <h3 className="font-bold text-xl text-slate-900 mb-4 tracking-tight">
              Próximos horarios disponibles
            </h3>
            <p className="font-bold text-slate-900 mb-3 text-sm">Hoy</p>

            <div className="flex flex-col gap-3 flex-1">
              {horariosHoy.map((hora) => {
                const isAvailable = !ocupados.includes(normalize(hora));

                return (
                  <div
                    key={hora}
                    className="flex justify-between items-center border border-slate-400 rounded-xl px-4 py-3 bg-transparent"
                  >
                    <span className="text-slate-800 text-[15px]">{hora}</span>
                    
                    {isAvailable ? (
                      <button
                        onClick={() => onStartBooking(hora)}
                        className="bg-[#0f172a] text-white text-sm font-bold px-6 py-2 rounded-full hover:bg-black transition-colors"
                      >
                        Reservar
                      </button>
                    ) : (
                      <div className="bg-[#8b8b8b] text-white/90 text-sm font-bold px-4 py-2 rounded-full">
                        No disponible
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => onStartBooking(null)}
              className="mt-6 w-full bg-[#0f172a] text-white font-bold py-3.5 rounded-2xl hover:bg-black transition-colors text-[15px]"
            >
              Reservar en otro horario o fecha
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="flex items-center gap-2 border border-slate-400 rounded-xl px-4 py-3.5 bg-transparent">
      <span className="font-bold text-slate-900">{label}:</span>
      <span className="text-slate-800 lowercase">{value}</span>
    </div>
  );
}

export default CoworkingModal;