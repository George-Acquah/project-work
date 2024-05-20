import React from "react";

const BenefitsSection: React.FC = () => (
  <section className="benefits-section py-16">
    <div className="container mx-auto text-center">
      <h2 className="text-2xl font-bold mb-8">Benefits</h2>
      <ul className="list-disc text-lg text-left">
        <li>Time-saving</li>
        <li>Convenience</li>
        <li>Reduced environmental impact</li>
      </ul>
    </div>
  </section>
);

export default BenefitsSection;
