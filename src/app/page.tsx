import Hero from "@/components/Hero/Hero";
import CredibilityStrip from "@/components/CredibilityStrip/CredibilityStrip";
import About from "@/components/About/About";
import Audience from "@/components/Audience/Audience";
import Programme from "@/components/Programme/Programme";
import Speakers from "@/components/Speakers/Speakers";
import Partners from "@/components/Partners/Partners";
import Venue from "@/components/Venue/Venue";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <main className="bg-mesh-network">
        <Hero />
        <Audience />
        <About />
        <Speakers />
        <Partners />
        <Programme />
        <Venue />
      </main>
      <Footer />
    </>
  );
}
