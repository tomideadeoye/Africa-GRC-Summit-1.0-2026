import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Audience from "@/components/Audience/Audience";
import Speakers from "@/components/Speakers/Speakers";
import Venue from "@/components/Venue/Venue";
import Programme from "@/components/Programme/Programme";
import Partners from "@/components/Partners/Partners";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Audience />
      <Speakers />
      <Programme />
      <Partners />
      <Venue />
      <Footer />
    </main>
  );
}
