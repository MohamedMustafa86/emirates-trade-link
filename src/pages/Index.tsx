
import { useState } from "react";
import Header from "@/components/Header";
import BusinessSection from "@/components/BusinessSection";
import ProductCategories from "@/components/ProductCategories";
import BenefitsSection from "@/components/BenefitsSection";
import StatsSection from "@/components/StatsSection";
import PromotionalSection from "@/components/PromotionalSection";
import CTASection from "@/components/CTASection";
import FixedFooter from "@/components/FixedFooter";

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState("العربية");

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    console.log(`Language changed to: ${language}`);
    
    // Update document direction and language properly
    const body = document.body;
    const html = document.documentElement;
    
    if (language === "العربية") {
      body.dir = "rtl";
      html.dir = "rtl";
      html.lang = "ar";
      body.style.direction = "rtl";
    } else {
      body.dir = "ltr";
      html.dir = "ltr";
      body.style.direction = "ltr";
      html.lang = language === "English" ? "en" : "fr";
    }
    
    // Force a re-render by updating a CSS custom property
    document.documentElement.style.setProperty('--text-direction', language === "العربية" ? 'rtl' : 'ltr');
    
    console.log(`تم تغيير اللغة إلى ${language}`);
  };

  const scrollToProductCategories = () => {
    const element = document.getElementById('product-categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative flex min-h-screen flex-col bg-white pb-10" 
      dir={currentLanguage === "العربية" ? "rtl" : "ltr"} 
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <Header 
        currentLanguage={currentLanguage} 
        onLanguageChange={handleLanguageChange} 
      />

      {/* Content with top padding to account for fixed header */}
      <div className="pt-24">
        <BusinessSection 
          currentLanguage={currentLanguage} 
          onScrollToProductCategories={scrollToProductCategories} 
        />

        <main className="flex-1">
          <ProductCategories currentLanguage={currentLanguage} />
          <BenefitsSection currentLanguage={currentLanguage} />
          <StatsSection currentLanguage={currentLanguage} />
          <PromotionalSection />
          <CTASection currentLanguage={currentLanguage} />
        </main>
      </div>

      <FixedFooter currentLanguage={currentLanguage} />
    </div>
  );
};

export default Index;
