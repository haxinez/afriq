import Header from "./components/header";
import HeroSection from "./components/hero";
import Footer from "./components/footer";

import ShopByCatalogue from "./components/shopbyCat";

export default function Home() {
  return (
    <main className="">
    <Header/>
    <section className="">
      <HeroSection/>
      <ShopByCatalogue/>
    </section>
    <footer>
     <Footer/>
    </footer>
    
    </main>
  );
}
