"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import BookImage from "@/components/ui/library/BookImage";

function HeaderCart({ cartRef, openCart, setOpenCart, totalItems }) {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
  } = useCart();

  const router = useRouter();

  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div ref={cartRef} className="relative">

      {/* BOTÓN */}
      <button
        onClick={() => setOpenCart(!openCart)}
        className="relative py-1 hover:underline"
      >
        Carrito

        {totalItems > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
            {totalItems}
          </span>
        )}
      </button>

      {/* DROPDOWN */}
      {openCart && (
        <div className="
          absolute right-0 mt-3 w-[420px]
          rounded-xl bg-white border border-border-default
          shadow-2xl p-4 z-50
        ">

          {cart.length === 0 ? (
            <p className="text-center text-sm text-text-secondary py-6">
              Tu carrito está vacío
            </p>
          ) : (
            <>
              {/* ITEMS */}
              <div className="max-h-[320px] overflow-y-auto pr-1">

                {cart.map((item) => (
                  <div
                    key={item.bookId}
                    className="flex items-center gap-3 py-3 border-b border-border-default"
                  >
                    {/* IMAGE */}
                    <BookImage
                      src={item.imagen}
                      alt={item.titulo}
                      size="thumb"
                    />

                    {/* INFO */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.titulo}
                      </p>

                      <p className="text-xs text-text-secondary">
                        ${item.precio.toLocaleString()}
                      </p>
                    </div>

                    {/* CONTROLES */}
                    <div className="flex items-center gap-2 border rounded-md px-2 py-1">
                      <button
                        onClick={() => decreaseQty(item.bookId)}
                        className="w-6 h-6 flex items-center justify-center text-sm hover:bg-slate-100 rounded"
                      >
                        −
                      </button>

                      <span className="text-sm font-semibold w-5 text-center">
                        {item.cantidad}
                      </span>

                      <button
                        onClick={() => increaseQty(item.bookId)}
                        className="w-6 h-6 flex items-center justify-center text-sm hover:bg-slate-100 rounded"
                      >
                        +
                      </button>
                    </div>

                    {/* SUBTOTAL */}
                    <div className="text-sm font-semibold text-right min-w-[70px]">
                      ${(item.precio * item.cantidad).toLocaleString()}
                    </div>

                    {/* DELETE */}
                    <button
                      onClick={() => removeFromCart(item.bookId)}
                      className="
                        text-red-500
                        text-sm
                        hover:scale-110
                        transition
                      "
                      title="Eliminar"
                    >
                      🗑
                    </button>
                  </div>
                ))}

              </div>

              {/* FOOTER */}
              <div className="pt-3 border-t border-border-default space-y-3">

                {/* TOTAL */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-text-secondary">
                    Total
                  </span>

                  <span className="font-bold text-lg">
                    ${total.toLocaleString()}
                  </span>
                </div>

                {/* ACCIONES */}
                <div className="flex gap-2">

                  {/* VACIAR */}
                  <button
                    onClick={() => {
                      if (confirm("¿Vaciar carrito?")) clearCart();
                    }}
                    className="
                      flex-1
                      py-2
                      text-sm
                      border border-border-default
                      rounded-md
                      hover:bg-slate-100
                      transition
                    "
                  >
                    Vaciar
                  </button>

                  {/* VER CARRITO */}
                  <button
                    onClick={() => {
                      setOpenCart(false);
                      router.push("/cart");
                    }}
                    className="flex-1 btn-primary py-2"
                  >
                    Ver carrito
                  </button>

                </div>

              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default HeaderCart;