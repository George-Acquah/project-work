import React from "react";
import Header from "../ui/nav/header";
import HowItWorksSection from "../ui/shared/section/how-it-works";
import ContactSection from "../ui/shared/section/contacts";
import Hero from "../ui/shared/section/hero";

const LandingPage = () => {
  return (
    <main>
      <Header />
      <Hero />
      <ContactSection />
      <HowItWorksSection />
      <ContactSection />
      <HowItWorksSection />
      <ContactSection />
      <HowItWorksSection />
    </main>
  );
};

export default LandingPage;
