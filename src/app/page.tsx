import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Audience from "@/components/Audience/Audience";
import Programme from "@/components/Programme/Programme";
import Speakers from "@/components/Speakers/Speakers";
import Partners from "@/components/Partners/Partners";
import Venue from "@/components/Venue/Venue";
import Footer from "@/components/Footer/Footer";
import { getMasterConfig } from "@/lib/config-store";

export default async function Home() {
  const config = await getMasterConfig();
  const heroData =
    config.hero && typeof config.hero === "object"
      ? (config.hero as {
          title: string;
          subtitle: string;
          dates: string;
          venue: string;
          tagline: string;
          badge: string;
          status: string;
        })
      : null;

  return (
    <>
      <main className="bg-mesh-network">
        <Hero initialData={heroData} />
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
