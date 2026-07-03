import { auth0 } from "./lib/auth0";

// Intercepta las peticiones y ejecuta  Auth0 v4
export async function proxy(request) {
  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
