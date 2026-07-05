import { Inter } from "next/font/google";
import "../globals.css";
import Providers from "@/context/Providers";
import { TranslationsProvider } from "@/context/TranslationsProvider";
import { getDictionary } from "@/dictionaries";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Nexus - Librería y Coworking Universitario",
  description:
    "Aplicación web desarrollada con Next.js para librería universitaria y espacios de coworking.",
};

export function generateStaticParams() {
  return [
    { lang: 'es' },
    { lang: 'en' },
    { lang: 'fr' },
    { lang: 'it' },
    { lang: 'de' }
  ];
}

export default async function RootLayout(props) {
  const { children, params } = props;
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${inter.variable} h-full antialiased`}
    >
        <body className="min-h-full flex flex-col">
          <TranslationsProvider dictionary={dictionary}>
            <Providers>
              {children}
            </Providers>
          </TranslationsProvider>
        </body>
    </html>
  );
}
