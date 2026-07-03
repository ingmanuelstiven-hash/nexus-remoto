import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/context/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans", // 🔥 clave
  display: "swap",
});

export const metadata = {
  title: "Nexus - Librería y Coworking Universitario",
  description:
    "Aplicación web desarrollada con Next.js para librería universitaria y espacios de coworking.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
        <body className="min-h-full flex flex-col">
          <Providers>
            {children}
          </Providers>
        </body>
    </html>
  );
}
