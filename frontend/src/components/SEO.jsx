import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, canonicalUrl, ogImage, ogType = 'website' }) => {
  const siteName = 'AryChitra';
  const defaultTitle = 'AryChitra — Crafting Digital Futures';
  const defaultDescription = 'AryChitra is a premier technology and software solutions company crafting digital futures through innovative web development, mobile apps, AI/ML, cloud solutions, and UI/UX design.';
  const defaultImage = 'https://arychitra.com/og-image.jpg'; // Placeholder default image
  const defaultUrl = 'https://arychitra.com';

  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const metaDesc = description || defaultDescription;

  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl || defaultUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:url" content={canonicalUrl || defaultUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImage || defaultImage} />
    </Helmet>
  );
};

export default SEO;
