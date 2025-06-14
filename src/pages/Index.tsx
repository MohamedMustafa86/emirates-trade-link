
import Header from "@/components/Header";
import BusinessSection from "@/components/BusinessSection";
import ProductCategories from "@/components/ProductCategories";
import BenefitsSection from "@/components/BenefitsSection";
import StatsSection from "@/components/StatsSection";
import PromotionalSection from "@/components/PromotionalSection";
import CTASection from "@/components/CTASection";
import FixedFooter from "@/components/FixedFooter";
import { useLanguage } from "@/hooks/useLanguage";

const Index = () => {
  const { currentLanguage, handleLanguageChange } = useLanguage();

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
      <div className="pt-32">
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
