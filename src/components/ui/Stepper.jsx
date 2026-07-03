"use client";

export default function Stepper({
  step = 1,
  onChange,
  clickable = true,
  steps = ["Seleccionar", "Datos", "Confirmar"],
}) {
  return (
    <div className="flex items-center justify-center w-full mb-8">
      {steps.map((label, i) => {
        const num = i + 1;
        const isActive = step === num;
        const isCompleted = step > num;

        return (
          <div key={num} className="flex items-center">
            {/* CÍRCULO */}
            <div
              onClick={() => clickable && onChange?.(num)}
              className={`
                w-10 h-10 flex items-center justify-center rounded-full font-bold text-base text-white
                transition-all
                ${clickable ? "cursor-pointer" : "cursor-default"}
                ${
                  isCompleted
                    ? "bg-[#b09600]" // oro oscuro
                    : isActive
                      ? "bg-[#fae100] scale-110 shadow-sm" // amarillo brillante
                      : "bg-[#4b5563]" // gris oscuro
                }
              `}
            >
              {isCompleted ? "✓" : num}
            </div>

            {/* LABEL */}
            <div className="hidden sm:block ml-3 mr-4">
              <span
                className={`text-[15px] ${
                  isActive
                    ? "font-bold text-slate-900"
                    : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>

            {/* LINEA */}
            {i < steps.length - 1 && (
              <div
                className={`
                  h-[2px] w-12 sm:w-16 md:w-24 ml-2 mr-6
                  transition-colors
                  ${
                    isCompleted
                      ? "bg-[#b09600]"
                      : "bg-slate-300"
                  }
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}