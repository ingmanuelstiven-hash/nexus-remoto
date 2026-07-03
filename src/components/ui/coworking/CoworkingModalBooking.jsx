"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Stepper from "@/components/ui/Stepper";
import { useLoader } from "@/hooks/useLoader";

function BookingFlow({ space, onClose, selectedHour }) {

  const router = useRouter();

  const [step, setStep] = useState(selectedHour ? 2 : 1);

  const [bookingData, setBookingData] = useState({
    hora: selectedHour ? selectedHour.replace("h", "") : "",
    celular: "",
    notas: "",
  });

  const ocupados = space.horariosOcupados || [];

  const horarios = [
    "08:00","09:00","10:00","11:00","12:00","13:00",
    "14:00","15:00","16:00","17:00","18:00","19:00",
  ];

  const { isLoading, startLoading, stopLoading } = useLoader(false);

  const update = (key, value) => {
    setBookingData((prev) => ({ ...prev, [key]: value }));
  };

  const handleConfirm = async () => {
    startLoading();

    try {
      await new Promise((res) => setTimeout(res, 1200));

      // 🔥 aquí conectarías backend
      
      setStep(4);

    } finally {
      stopLoading();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center px-4"
      onClick={onClose}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 rounded-[20px]">
          <p className="text-white font-bold">Procesando reserva...</p>
        </div>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#f4f7f9] rounded-[20px] p-8 md:p-10 shadow-2xl space-y-6"
      >
        {step < 4 && (
          <>
            {/* CLOSE */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-2xl font-bold opacity-70 hover:opacity-100 text-slate-800"
            >
              ×
            </button>

            <h2 className="text-[28px] font-bold text-slate-900 tracking-tight">
              Reserva en {space.nombre}
            </h2>

            <Stepper step={step} clickable={false} />
          </>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-6 mt-6">

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {horarios.map((h) => {
                const ocupado = ocupados.includes(h);
                const active = bookingData.hora === h;

                return (
                  <button
                    key={h}
                    disabled={ocupado}
                    onClick={() => update("hora", h)}
                    className={`
                      py-3 rounded-xl text-sm font-bold border transition-colors
                      ${
                        active
                          ? "bg-[#0f172a] text-white border-transparent"
                          : ocupado
                            ? "bg-[#8b8b8b] text-white/90 border-transparent opacity-80 cursor-not-allowed"
                            : "bg-transparent border-slate-400 text-slate-900 hover:bg-slate-200"
                      }
                    `}
                  >
                    {h}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-4 mt-8">
              <button 
                onClick={onClose} 
                className="flex-1 border border-slate-400 bg-transparent text-slate-900 font-bold py-3.5 rounded-2xl hover:bg-slate-200 transition-colors"
              >
                Cancelar
              </button>

              <button
                disabled={!bookingData.hora}
                onClick={() => setStep(2)}
                className="flex-1 bg-[#0f172a] text-white font-bold py-3.5 rounded-2xl hover:bg-black transition-colors disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>

          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6 mt-6">

            <p className="text-[15px] text-slate-900">
              Hora seleccionada: <strong className="text-xl ml-1">{bookingData.hora}</strong>
            </p>

            <input
              type="tel"
              placeholder="Celular"
              value={bookingData.celular}
              onChange={(e) => update("celular", e.target.value)}
              className="w-full border border-slate-400 rounded-xl px-4 py-3.5 bg-white outline-none focus:border-[#0f172a] focus:ring-1 focus:ring-[#0f172a] text-slate-900"
            />

            <textarea
              placeholder="Notas (opcional)"
              value={bookingData.notas}
              onChange={(e) => update("notas", e.target.value)}
              className="w-full border border-slate-400 rounded-xl px-4 py-3.5 bg-white outline-none focus:border-[#0f172a] focus:ring-1 focus:ring-[#0f172a] text-slate-900 min-h-[120px] resize-y"
            />

            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => setStep(1)} 
                className="flex-1 border border-slate-400 bg-transparent text-slate-900 font-bold py-3.5 rounded-2xl hover:bg-slate-200 transition-colors"
              >
                Atrás
              </button>

              <button
                disabled={!bookingData.celular}
                onClick={() => setStep(3)}
                className="flex-1 bg-[#0f172a] text-white font-bold py-3.5 rounded-2xl hover:bg-black transition-colors disabled:opacity-50"
              >
                Revisar
              </button>
            </div>

          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-6 mt-6">

            <div className="border border-slate-400 rounded-xl p-5 bg-transparent space-y-3 text-[15px] text-slate-800">
              <p><strong className="text-slate-900">Espacio:</strong> {space.nombre}</p>
              <p><strong className="text-slate-900">Hora:</strong> {bookingData.hora}</p>
              <p><strong className="text-slate-900">Celular:</strong> {bookingData.celular}</p>
              <p><strong className="text-slate-900">Notas:</strong> {bookingData.notas || "—"}</p>
            </div>

            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => setStep(2)} 
                className="flex-1 border border-slate-400 bg-transparent text-slate-900 font-bold py-3.5 rounded-2xl hover:bg-slate-200 transition-colors"
              >
                Atrás
              </button>

              <button 
                onClick={handleConfirm} 
                className="flex-1 bg-[#0f172a] text-white font-bold py-3.5 rounded-2xl hover:bg-black transition-colors"
              >
                Confirmar Reserva
              </button>
            </div>

          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="flex flex-col items-center text-center py-6 space-y-4">
            <div className="w-20 h-20 bg-[#e8f5e9] text-[#2e7d32] rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h2 className="text-[28px] font-bold text-slate-900 tracking-tight">
              ¡Reserva Confirmada!
            </h2>
            
            <p className="text-[15px] text-slate-600 max-w-sm mx-auto leading-relaxed">
              Tu reserva para la <strong className="text-slate-900">{space.nombre}</strong> a las <strong className="text-slate-900">{bookingData.hora}</strong> ha sido agendada con éxito.
            </p>
            
            <button 
              onClick={() => { onClose(); router.push("/dashboard"); }} 
              className="mt-8 w-full sm:w-auto bg-[#0f172a] text-white font-bold px-12 py-3.5 rounded-2xl hover:bg-black transition-colors"
            >
              Volver al inicio
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default BookingFlow;