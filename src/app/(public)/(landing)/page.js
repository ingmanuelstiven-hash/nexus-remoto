import Hero from "@/components/section/home/Hero";
import Services from "@/components/section/home/Services";
import Pricing from "@/components/section/home/Pricing";

function Home() {
  return (
    <div className="min-h-dvh flex flex-col">

      

      <main className="flex-1">

        {/* HERO */}
        <section className="pt-10">
          <Hero />
        </section>

        {/* SERVICES */}
        <section className="mt-20">
          <Services />
        </section>

        {/* PRICING */}
        <section className="mt-24 mb-10">
          <Pricing />
        </section>

      </main>

   
    </div>
  );
}

export default Home;