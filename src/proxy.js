import { NextResponse } from 'next/server';
import { auth0 } from "./lib/auth0";

const locales = ['es', 'en', 'fr', 'it', 'de'];
const defaultLocale = 'es';

function getLocale(request) {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return defaultLocale;
  
  const requestedLocales = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim().substring(0, 2));
  const match = requestedLocales.find(lang => locales.includes(lang));
  return match || defaultLocale;
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Excluir archivos estáticos, imágenes, rutas de auth y apis
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/auth') ||
    pathname.includes('.')
  ) {
    return await auth0.middleware(request);
  }

  // Verificar si la URL ya tiene el idioma
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // Redirigir a la misma URL pero con el idioma prefijado
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // Continuar la ejecución pasando por Auth0 para validación de sesión
  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
