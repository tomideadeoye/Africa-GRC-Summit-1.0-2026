import type { Metadata } from "next";
import Registration from "@/components/Registration/Registration";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Register — Africa GRC Summit 2026",
  description:
    "Register for the 1st Annual Africa GRC Summit 2026. Choose from Conference, Full Summit, or Industry Pass options. Join Africa's premier executive forum on Governance, Risk, and Compliance.",
};

export default function RegisterPage() {
  return (
    <main>
      <Registration />
      <Footer />
    </main>
  );
}
