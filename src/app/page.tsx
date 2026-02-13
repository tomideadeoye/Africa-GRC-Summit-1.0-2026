import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Audience from "@/components/Audience/Audience";
// import Speakers from "@/components/Speakers/Speakers"; // Hidden until real speaker data is confirmed
// import Programme from "@/components/Programme/Programme"; // Hidden until real agenda is confirmed
import Partners from "@/components/Partners/Partners";
import Venue from "@/components/Venue/Venue";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Audience />
      {/* Speakers and Programme sections hidden until confirmed data is provided */}
      <Partners />
      <Venue />
      <Footer />
    </main>
  );
}
