"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getImageSrc } from "@/lib/getImageSrc";

function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  const total = cart.reduce(
    (acc, item) =>
      acc + Number(item.precio || 0) * Number(item.cantidad || 0),
    0
  );

  // 🔥 EMPTY STATE
  if (!cart.length) {
    return (
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100 text-2xl">
            🛒
          </div>

          <h2 className="text-2xl font-bold text-slate-950 mb-3">
            Tu carrito está vacío
          </h2>

          <p className="text-sm leading-6 text-slate-600 mb-6">
            Explora la librería y añade tus libros o revistas favoritas para
            continuar con la compra.
          </p>

          <Link
            href="/library"
            className="
              inline-flex items-center justify-center
              rounded-xl bg-slate-950 px-6 py-3
              text-sm font-bold text-white
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-yellow-300 hover:text-slate-950
              hover:shadow-md
            "
          >
            Explorar librería
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-yellow-500 mb-2">
            Resumen de compra
          </p>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-slate-950">
                Carrito
              </h1>

              <p className="mt-2 text-sm text-slate-600">
                Revisa los productos seleccionados antes de finalizar tu compra.
              </p>
            </div>

            <Link
              href="/library"
              className="text-sm font-semibold text-slate-600 underline-offset-4 hover:underline hover:text-slate-950"
            >
              Seguir comprando
            </Link>
          </div>
        </div>

        <ul className="space-y-4">
          {cart.map((item) => {
            const precio = Number(item.precio || 0);
            const cantidad = Number(item.cantidad || 0);
            const subtotal = precio * cantidad;

            const etiqueta =
              item.tipo === "cafeteria" ? "Cafetería" : "Libro";

            return (
              <li
                key={item.bookId}
                className="
                  rounded-2xl border border-slate-200
                  bg-white p-4 sm:p-5
                  shadow-sm
                  transition-all duration-300
                  hover:shadow-md
                "
              >
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-5 md:items-center">
                  {/* INFO */}
                  <div className="flex gap-4 min-w-0">
                    <img
  src={getImageSrc(item.imagen)}
  alt={item.titulo}
  className="
    h-28 w-20 flex-shrink-0
    rounded-xl object-cover object-top
    bg-slate-50
  "
/>

                    <div className="flex min-w-0 flex-col justify-center">
                      <span className="mb-1 text-xs text-slate-500">
                        {etiqueta}
                      </span>

                      <strong className="line-clamp-2 text-lg font-bold text-slate-950">
                        {item.titulo}
                      </strong>

                      <span className="mt-1 text-sm text-slate-600 line-clamp-1">
                        {item.autor}
                      </span>

                      <strong className="mt-2 text-base font-bold text-slate-950">
                        ${precio.toLocaleString()}
                      </strong>
                    </div>
                  </div>

                  {/* QUANTITY */}
                  <div className="flex items-center justify-between gap-4 md:justify-center">
                    <span className="text-sm font-semibold text-slate-500 md:hidden">
                      Cantidad
                    </span>

                    <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                      <button
                        type="button"
                        onClick={() => decreaseQty(item.bookId)}
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
                        onClick={() => increaseQty(item.bookId)}
                        className="
                          flex h-9 w-9 items-center justify-center
                          rounded-lg text-base font-bold text-slate-600
                          transition hover:bg-white hover:shadow-sm
                        "
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* SUBTOTAL + DELETE */}
                  <div className="flex items-center justify-between gap-4 md:min-w-[170px] md:justify-end">
                    <div className="text-left md:text-right">
                      <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Subtotal
                      </span>

                      <span className="block text-lg font-bold text-slate-950">
                        ${subtotal.toLocaleString()}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.bookId)}
                      className="
                        inline-flex h-9 w-9 items-center justify-center
                        rounded-full border border-red-100
                        bg-red-50 text-red-500
                        transition-all duration-300
                        hover:bg-red-500 hover:text-white hover:shadow-sm
                      "
                      aria-label={`Eliminar ${item.titulo} del carrito`}
                      title="Eliminar"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </main>

      {/* 🔥 STICKY TOTAL */}
      <div className="sticky bottom-0 w-full border-t border-slate-200 bg-white/95 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between px-4 sm:px-6 lg:px-8 py-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Total
            </span>

            <span className="block text-2xl font-extrabold text-slate-950">
              ${total.toLocaleString()}
            </span>
          </div>

          <Link
            href="/checkout"
            className="
              inline-flex items-center justify-center
              rounded-xl bg-yellow-300 px-7 py-3
              text-sm font-bold text-slate-950
              transition-all duration-300
              hover:-translate-y-0.5 hover:shadow-md
            "
          >
            Finalizar compra
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;