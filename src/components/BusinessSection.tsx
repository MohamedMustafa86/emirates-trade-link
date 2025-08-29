
import { Grid3X3, MessageCircle, Package, Factory, Users, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import QuoteRequestDialog from "@/components/QuoteRequestDialog";
import SupplierRegistrationDialog from "@/components/SupplierRegistrationDialog";
import { getTranslation } from "@/utils/translations";

interface BusinessSectionProps {
  currentLanguage: string;
  onScrollToProductCategories: () => void;
}

const BusinessSection = ({ currentLanguage, onScrollToProductCategories }: BusinessSectionProps) => {
  return (
    <div className="bg-white px-4 py-4">
      <h2 className="text-[#111418] text-[20px] font-bold leading-tight tracking-[-0.015em] mb-3">
        {getTranslation("forYourBusiness", currentLanguage)}
      </h2>
      <div className="grid grid-cols-4 gap-3 mb-4">
        <button 
          onClick={onScrollToProductCategories}
          className="bg-orange-500 rounded-lg p-3 text-white text-center hover:bg-orange-600 transition-colors"
        >
          <div className="flex justify-center mb-2">
            <Grid3X3 className="h-6 w-6" />
          </div>
          <p className="text-xs font-medium">{getTranslation("allCategories", currentLanguage)}</p>
        </button>
        <QuoteRequestDialog>
          <div className="bg-blue-600 rounded-lg p-3 text-white text-center cursor-pointer hover:bg-blue-700 transition-colors">
            <div className="flex justify-center mb-2">
              <MessageCircle className="h-6 w-6" />
            </div>
            <p className="text-xs font-medium">{getTranslation("requestQuote", currentLanguage)}</p>
          </div>
        </QuoteRequestDialog>
        <Link to="/suppliers" className="bg-green-700 rounded-lg p-3 text-white text-center hover:bg-green-800 transition-colors">
          <div className="flex justify-center mb-2">
            <Package className="h-6 w-6" />
          </div>
          <p className="text-xs font-medium">{getTranslation("gulfSupplier", currentLanguage)}</p>
        </Link>
        <SupplierRegistrationDialog>
          <div className="bg-purple-600 rounded-lg p-3 text-white text-center cursor-pointer hover:bg-purple-700 transition-colors">
            <div className="flex justify-center mb-2">
              <Factory className="h-6 w-6" />
            </div>
            <p className="text-xs font-medium">{getTranslation("registerAsSupplier", currentLanguage)}</p>
          </div>
        </SupplierRegistrationDialog>
      </div>
      
      {/* Quick Actions Section with Messages */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
        <h3 className="text-[#111418] text-[16px] font-semibold mb-3">
          {getTranslation("quickActions", currentLanguage)}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Link 
            to="/messages" 
            className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 text-white text-center hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <div className="flex justify-center mb-2">
              <MessageSquare className="h-7 w-7" />
            </div>
            <p className="text-sm font-semibold mb-1">
              {currentLanguage === "العربية" ? "المراسلات" : currentLanguage === "English" ? "Messages" : "Messages"}
            </p>
            <p className="text-xs opacity-90">
              {currentLanguage === "العربية" ? "تواصل مع الموردين" : currentLanguage === "English" ? "Connect with suppliers" : "Connectez avec les fournisseurs"}
            </p>
          </Link>
          <Link 
            to="/manufacturers" 
            className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-4 text-white text-center hover:from-teal-600 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <div className="flex justify-center mb-2">
              <Users className="h-7 w-7" />
            </div>
            <p className="text-sm font-semibold mb-1">
              {currentLanguage === "العربية" ? "المصنعون" : currentLanguage === "English" ? "Manufacturers" : "Fabricants"}
            </p>
            <p className="text-xs opacity-90">
              {currentLanguage === "العربية" ? "اكتشف المصانع" : currentLanguage === "English" ? "Discover factories" : "Découvrez les usines"}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessSection;
