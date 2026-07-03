"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useI18n } from "@/context/TranslationsProvider";

const locales = ['es', 'en', 'fr', 'it', 'de'];

export default function LanguageSwitcher({ className = '' }) {
  const pathname = usePathname(); // e.g., '/en/library' or '/'
  const t = useI18n();

  // Remove the current locale from pathname
  const getPathnameWithoutLocale = () => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    if (segments.length > 1 && locales.includes(segments[1])) {
      segments.splice(1, 1); // Remove the locale segment
      return segments.join('/') || '/';
    }
    return pathname;
  };

  const currentLocale = pathname ? (pathname.split('/')[1] || 'es') : 'es';
  // Ensure we don't accidentally get something that isn't a valid locale
  const activeLocale = locales.includes(currentLocale) ? currentLocale : 'es';
  
  const cleanPath = getPathnameWithoutLocale();

  return (
    <div className={`flex gap-1.5 text-[10px] sm:text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full ${className}`}>
      {locales.map((locale, index) => {
        const isActive = activeLocale === locale;
        return (
          <span key={locale} className="flex items-center gap-1.5">
            <Link
              href={`/${locale}${cleanPath === '/' ? '' : cleanPath}`}
              className={`transition-all px-1.5 py-0.5 rounded ${isActive ? 'text-white bg-brand-600 shadow-sm' : 'hover:text-brand-600'}`}
            >
              {locale.toUpperCase()}
            </Link>
            {index < locales.length - 1 && <span>|</span>}
          </span>
        );
      })}
    </div>
  );
}
