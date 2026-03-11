import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Services from "./components/Services";
import Process from "./components/Process";
import Advantages from "./components/Advantages";
import Realisations from "./components/Realisations";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import "./styles/Navbar.css";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Process />
      <Advantages />
      <Realisations />
      <Testimonials />
      <CTA />
      <Footer />
      <ScrollTop />
    </>
  );
}
