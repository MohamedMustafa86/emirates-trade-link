
import { Grid3X3, MessageCircle, Package, Factory } from "lucide-react";
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
      <div className="grid grid-cols-4 gap-3">
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
    </div>
  );
};

export default BusinessSection;
