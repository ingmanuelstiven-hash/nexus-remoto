// src/components/ui/Loader.jsx
export default function Loader({ text = "Cargando..." }) {
  return (
    <div className="fixed inset-0 z-50 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center gap-4">

      <div className="w-10 h-10 rounded-full border-4 border-border-light border-t-border-default animate-spin" />

      <span className="text-sm text-text-primary">
        {text}
      </span>

    </div>
  );
}