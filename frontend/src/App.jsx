import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import WhyChooseUsPage from './pages/WhyChooseUsPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import OrderPage from './pages/OrderPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import PricingPage from './pages/PricingPage';

import CareersPage from './pages/CareersPage';
import JobDetailsPage from './pages/JobDetailsPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import CaseStudyDetailPage from './pages/CaseStudyDetailPage';

// Admin Pages
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

import ClientLoginPage from './pages/ClientLoginPage';
import ClientDashboardPage from './pages/ClientDashboardPage';

// Service Pages (Preserved for backward compatibility, but we will have a unified one)
import UiUxPage from './pages/UiUxPage';
import CloudPage from './pages/CloudPage';
import AiMlPage from './pages/AiMlPage';
import DigitalMarketingPage from './pages/DigitalMarketingPage';
import ItConsultingPage from './pages/ItConsultingPage';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/why-choose-us" element={<PageTransition><WhyChooseUsPage /></PageTransition>} />
        <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
        <Route path="/portfolio" element={<PageTransition><PortfolioPage /></PageTransition>} />
        <Route path="/portfolio/:id" element={<PageTransition><ProjectDetailPage /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
        <Route path="/blog/:id" element={<PageTransition><BlogPostPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><PricingPage /></PageTransition>} />

        <Route path="/careers" element={<PageTransition><CareersPage /></PageTransition>} />
        <Route path="/careers/:id" element={<PageTransition><JobDetailsPage /></PageTransition>} />
        <Route path="/case-studies" element={<PageTransition><CaseStudiesPage /></PageTransition>} />
        <Route path="/case-studies/:id" element={<PageTransition><CaseStudyDetailPage /></PageTransition>} />
        
        {/* Preserved Routes */}
        <Route path="/services/ui-ux" element={<PageTransition><UiUxPage /></PageTransition>} />
        <Route path="/services/cloud" element={<PageTransition><CloudPage /></PageTransition>} />
        <Route path="/services/ai-ml" element={<PageTransition><AiMlPage /></PageTransition>} />
        <Route path="/services/digital-marketing" element={<PageTransition><DigitalMarketingPage /></PageTransition>} />
        <Route path="/services/it-consulting" element={<PageTransition><ItConsultingPage /></PageTransition>} />
        <Route path="/order" element={<PageTransition><OrderPage /></PageTransition>} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

        {/* Client Routes */}
        <Route path="/client/login" element={<ClientLoginPage />} />
        <Route path="/client/dashboard" element={<ClientDashboardPage />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <Preloader isLoading={isLoading} />
      <CustomCursor />
      
      {!isLoading && (
        <div className="app-container" style={{ opacity: 1, transition: 'opacity 0.5s ease-in' }}>
          <Navbar />
          <ScrollToTop />
          <main style={{ minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
