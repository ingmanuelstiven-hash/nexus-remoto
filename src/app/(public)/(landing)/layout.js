import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="layout-publico">
        <Header />
        <main>
            {children}
        </main>
        <Footer />
    </div>
  );
}