import React from 'react';
import SEO from '../components/SEO';
import PricingSection from '../components/PricingSection';
import FAQSection from '../components/FAQSection';

function PricingPage() {
  return (
    <>
      <SEO title="Pricing" description="Transparent pricing plans for every scale. Startups to enterprise IT solutions." />
      <PricingSection />
      <FAQSection />
    </>
  );
}

export default PricingPage;
