import Product from "../components/product/Product";
import Hero from "../components/hero/Hero";
import Services from "../components/services/Services";
import Advantages from "../components/advantages/Advantages";
import About from "../components/about/About";
import Faq from "../components/faq/Faq";

export const metadata = {
  title: "Bosh sahifa | BS Gazobeton",
  description: "O'zbekistonning eng sifatli gazobeton mahsulotlari.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Product />
      <Services />
      <Advantages />
      <About />
      <Faq />
    </main>
  );
}
