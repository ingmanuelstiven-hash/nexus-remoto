import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contacto" className="footer pt-20 pb-20 text-slate-300">
      <div className="footer-container max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Col 1 */}
        <section className="rounded-3xl bg-slate-900/95 border border-slate-800/80 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.8)] p-8 space-y-5">
          <div className="text-white font-semibold text-2xl tracking-wide">NEXUS</div>
          <p className="text-sm leading-relaxed text-slate-400">
            Nexus apoya a la comunidad universitaria con recursos digitales y
            espacios de coworking diseñados para el futuro.
          </p>
        </section>

        {/* Col 2 */}
        <section className="rounded-3xl bg-slate-900/95 border border-slate-800/80 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.8)] p-8 space-y-5">
          <h2 className="text-white font-semibold text-2xl tracking-wide">Producto</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            <li>
              <Link href="/library" className="hover:text-white transition">
                Librería
              </Link>
            </li>
            <li>
              <Link href="/coworking" className="hover:text-white transition">
                Coworking
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-white transition">
                Carrito
              </Link>
            </li>
          </ul>
        </section>

        {/* Col 3 */}
        <section className="rounded-3xl bg-slate-900/95 border border-slate-800/80 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.8)] p-8 space-y-5">
          <h2 className="text-white font-semibold text-2xl tracking-wide">Contacto</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            <li>
              <a
                className="hover:text-white transition"
                href="mailto:info@nexus.es"
              >
                Soporte técnico
              </a>
            </li>
            <li>
              <a className="hover:text-white transition" href="#">
                Privacidad
              </a>
            </li>
            <li>
              <a className="hover:text-white transition" href="#">
                Instagram
              </a>
            </li>
          </ul>
        </section>

        {/* Col 4 */}
        <section className="rounded-3xl bg-slate-900/95 border border-slate-800/80 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.8)] p-8 space-y-5">
          <h2 className="text-white font-semibold text-2xl tracking-wide">
            Reconocimientos
          </h2>

          <div className="rounded-2xl bg-slate-800/60 p-4 text-sm text-slate-200">
            Awwwards Honors
          </div>

          <div className="rounded-2xl bg-slate-800/60 p-4 text-sm text-slate-200">
            <span className="text-slate-400 text-xs">FEATURED ON</span>
            <br />
            <strong className="text-white">PRODUCT HUNT</strong>
          </div>
        </section>
      </div>
    </footer>
  );
}