"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import BookImage from "@/components/ui/library/BookImage";

function BookDetailClient({ book }) {
  const { addToCart } = useCart();
  const [cantidad, setCantidad] = useState(1);

  if (!book) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <p className="text-slate-500">Cargando...</p>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(
      {
        ...book,
        bookId: book.id,
      },
      cantidad
    );
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10 min-h-[62vh]">
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-yellow-500 mb-2">
          Detalle del libro
        </p>

        <h1 className="max-w-3xl text-2xl sm:text-3xl font-bold text-slate-950 leading-tight">
          {book.titulo}
        </h1>
      </div>

      <div
        className="
          grid grid-cols-1 lg:grid-cols-[340px_1fr]
          gap-6 lg:gap-8
          items-start
        "
      >
        {/* IMAGE */}
<section
  className="
    rounded-2xl border border-slate-200
    bg-white p-5
    shadow-[0_10px_30px_rgba(15,23,42,0.04)]
    flex items-center justify-center
    min-h-[353px]
  "
>
  <BookImage
    src={book.imagen}
    alt={book.titulo}
    size="detail"
    priority
    className="shadow-sm"
  />
</section>

        {/* INFO */}
        <section
          className="
            rounded-2xl border border-slate-200
            bg-white p-5 sm:p-6 lg:p-7
            shadow-[0_10px_30px_rgba(15,23,42,0.04)]
          "
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="
                inline-flex items-center rounded-full
                bg-yellow-300 px-3 py-1
                text-[11px] font-bold text-slate-950
              "
            >
              {book.categoria}
            </span>

            <span className="text-xs text-slate-400">
              Código #{book.id}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-slate-950">
            {book.titulo}
          </h2>

          <p className="mt-2 text-base text-slate-500">
            {book.autor}
          </p>

          <div className="my-5 h-px bg-slate-100" />

          <div className="grid gap-5 sm:grid-cols-[180px_1fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Precio
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-950">
                ${book.precio?.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 mb-2">
                Sinopsis
              </p>

              <p className="text-sm sm:text-base leading-7 text-slate-600">
                {book.sinopsis}
              </p>
            </div>
          </div>

          {/* CART */}
          <div
            className="
              mt-7 flex flex-col sm:flex-row
              gap-3 sm:items-center
            "
          >
            <div
              className="
                inline-flex w-fit items-center
                rounded-xl border border-slate-200
                bg-slate-50 p-1
              "
            >
              <button
                type="button"
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-lg text-base font-bold text-slate-600
                  transition hover:bg-white hover:shadow-sm
                "
              >
                -
              </button>

              <span className="min-w-10 text-center text-sm font-bold text-slate-950">
                {cantidad}
              </span>

              <button
                type="button"
                onClick={() => setCantidad((c) => c + 1)}
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-lg text-base font-bold text-slate-600
                  transition hover:bg-white hover:shadow-sm
                "
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="
                inline-flex items-center justify-center
                rounded-xl bg-slate-950
                px-6 py-3
                text-sm font-bold text-white
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-yellow-300
                hover:text-slate-950
                hover:shadow-md
              "
            >
              Añadir al carrito
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default BookDetailClient;