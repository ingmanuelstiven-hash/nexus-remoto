"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import BookImage from "./BookImage";

function BookCard({ libro }) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();

    const itemParaCarrito = {
      ...libro,
      bookId: libro.id,
    };

    addToCart(itemParaCarrito);
  };

  return (
    <article
      className="
        relative h-full
        glass-card
        p-4
        flex flex-col
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
        hover:border-brand-500/40
      "
    >
      {/* BADGE */}
      {libro.masVendido && (
        <span
          className="
            absolute top-3 left-3 z-10
            px-2.5 py-1
            rounded-full
            text-[11px] font-bold
            bg-yellow-300 text-slate-950
            shadow-sm
          "
        >
          Más vendido
        </span>
      )}

      {/* IMAGE */}
      <div
        onClick={() => router.push(`/library/${libro.id}`)}
        className="
          relative w-full
          h-[210px]
          mb-4
          rounded-xl overflow-hidden
          cursor-pointer
          bg-slate-50
        "
      >
        <BookImage
          src={libro.imagen}
          alt={libro.titulo}
          size="card"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col">
        {/* TITLE */}
        <h3
          className="
            min-h-[2.6rem]
            font-semibold
            text-sm
            leading-snug
            text-slate-950
            line-clamp-2
          "
        >
          {libro.titulo}
        </h3>

        {/* AUTHOR */}
        <p className="mt-1 text-xs text-slate-600 line-clamp-1">
          {libro.autor}
        </p>

        {/* CATEGORY */}
        <p className="mt-0.5 text-[11px] font-medium text-brand-700 line-clamp-1">
          {libro.categoria}
        </p>

        {/* PRICE */}
        <p className="mt-3 text-base font-bold text-slate-950">
          ${libro.precio?.toLocaleString()}
        </p>

        {/* ACTIONS */}
        <div className="mt-auto pt-4 space-y-2">
          {/* BUTTON DETAIL */}
          <button
            onClick={() => router.push(`/library/${libro.id}`)}
            className="
              btn-primary
              w-full py-2
              text-xs font-bold
              rounded-xl
            "
          >
            Ver detalle
          </button>

          {/* BUTTON CART */}
          <button
            onClick={handleAddToCart}
            className="
              btn-primary
              w-full py-2
              text-xs font-bold
              rounded-xl
            "
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </article>
  );
}

export default BookCard;