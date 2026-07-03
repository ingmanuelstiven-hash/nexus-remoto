import { useState, useMemo, useEffect } from "react";

function Slider3D({ images = [], interval = 3500 }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(null); // 🔥 dirección

  // AUTOPLAY
  useEffect(() => {
    if (images.length <= 1 || paused) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, paused]);

  // 🔥 handler con dirección
  const handleChange = (dir) => {
    if (animating) return;

    setDirection(dir);
    setAnimating(true);

    setTimeout(() => {
      setActive((prev) =>
        dir === "next"
          ? (prev + 1) % images.length
          : (prev - 1 + images.length) % images.length
      );

      setAnimating(false);
      setDirection(null);
    }, 150); // puedes ajustar 120–200
  };

  const visibleSlides = useMemo(() => {
    const prev = (active - 1 + images.length) % images.length;
    const next = (active + 1) % images.length;

    return [
      { index: prev, position: "left" },
      { index: active, position: "center" },
      { index: next, position: "right" },
    ];
  }, [active, images.length]);

  if (!images.length) return null;

  return (
    <div
      className="relative w-full aspect-[4/3] md:aspect-video max-w-2xl mx-auto"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {visibleSlides.map(({ index, position }) => {
          const isActive = position === "center";

          const transformMap = {
            left: animating
              ? direction === "next"
                ? "translateX(-45%) rotateY(25deg) scale(0.8)"   // sale
                : "translateX(-25%) rotateY(15deg) scale(0.9)"   // entra
              : "translateX(-35%) rotateY(25deg) scale(0.85)",

            center: animating
              ? "translateX(0) rotateY(0deg) scale(0.95)"
              : "translateX(0) rotateY(0deg) scale(1)",

            right: animating
              ? direction === "next"
                ? "translateX(25%) rotateY(-15deg) scale(0.9)"   // entra
                : "translateX(45%) rotateY(-25deg) scale(0.8)"   // sale
              : "translateX(35%) rotateY(-25deg) scale(0.85)",
          };

          const sizeMap = {
            center: "w-[75%] h-[85%] z-20",
            left: "w-[65%] h-[70%] z-10",
            right: "w-[65%] h-[70%] z-10",
          };

          return (
            <div
              key={index}
              onClick={() => {
                if (position === "left") handleChange("prev");
                if (position === "right") handleChange("next");
              }}
              className={`
                absolute cursor-pointer
                ${sizeMap[position]}
                rounded-2xl md:rounded-3xl overflow-hidden
                will-change-transform
                transition-all duration-500 ease-out
                ${isActive
                  ? "ring-1 ring-white/30 hover:scale-[1.05]"
                  : "opacity-60 hover:opacity-100"}
              `}
              style={{
                transform: transformMap[position],
                boxShadow: isActive
                  ? "0 20px 50px rgba(0,0,0,0.3)"
                  : "0 10px 20px rgba(0,0,0,0.2)",
              }}
            >
              <img
                src={images[index]}
                alt=""
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Slider3D;