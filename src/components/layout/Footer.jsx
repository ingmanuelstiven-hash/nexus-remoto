"use client";

import Link from "next/link";
import { useI18n } from "@/context/TranslationsProvider";

export default function Footer() {
  const t = useI18n();
  return (
    <footer id="contacto" className="footer pt-20 pb-20 text-slate-300">
      <div className="footer-container max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Col 1 */}
        <section className="rounded-3xl bg-slate-900/95 border border-slate-800/80 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.8)] p-8 space-y-5">
          <div className="text-white font-semibold text-2xl tracking-wide">{t.footer.about}</div>
          <p className="text-sm leading-relaxed text-slate-400">
            {t.footer.desc}
          </p>
        </section>

        {/* Col 2 */}
        <section className="rounded-3xl bg-slate-900/95 border border-slate-800/80 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.8)] p-8 space-y-5">
          <h2 className="text-white font-semibold text-2xl tracking-wide">{t.footer.product}</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            <li>
              <Link href="/library" className="hover:text-white transition">
                {t.footer.library}
              </Link>
            </li>
            <li>
              <Link href="/coworking" className="hover:text-white transition">
                {t.footer.coworking}
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-white transition">
                {t.footer.cart}
              </Link>
            </li>
          </ul>
        </section>

        {/* Col 3 */}
        <section className="rounded-3xl bg-slate-900/95 border border-slate-800/80 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.8)] p-8 space-y-5">
          <h2 className="text-white font-semibold text-2xl tracking-wide">{t.footer.contact}</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            <li>
              <a
                className="hover:text-white transition"
                href="mailto:info@nexus.es"
              >
                {t.footer.support}
              </a>
            </li>
            <li>
              <a className="hover:text-white transition" href="#">
                {t.footer.privacy}
              </a>
            </li>
            <li>
              <a className="hover:text-white transition" href="#">
                {t.footer.instagram}
              </a>
            </li>
          </ul>
        </section>

        {/* Col 4 */}
        <section className="rounded-3xl bg-slate-900/95 border border-slate-800/80 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.8)] p-8 space-y-5">
          <h2 className="text-white font-semibold text-2xl tracking-wide">
            {t.footer.awards}
          </h2>

          <div className="rounded-2xl bg-slate-800/60 p-4 text-sm text-slate-200">
            {t.footer.award_title}
          </div>

        
        </section>
      </div>
    </footer>
  );
}
// FORCE_REBUILD_1783124179830
