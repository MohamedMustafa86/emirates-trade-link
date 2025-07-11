
import { Link } from "react-router-dom";
import { Home, Grid3X3, MessageCircle, ShoppingCart, Lightbulb, User } from "lucide-react";
import { getTranslation } from "@/utils/translations";

interface FixedFooterProps {
  currentLanguage: string;
}

const FixedFooter = ({ currentLanguage }: FixedFooterProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      {/* Top section with logo - minimal size */}
      <div className="flex justify-center py-0.5 border-b border-gray-100">
        <div className="text-orange-500 font-bold text-xs tracking-wide">
          DUBAIMERX.COM
        </div>
      </div>
      
      {/* Bottom navigation - minimal padding */}
      <div className="flex gap-1 px-2 py-0.5">
        <Link to="/" className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full text-[#111418] py-0.5">
          <div className="text-[#111418] flex h-4 items-center justify-center">
            <Home className="h-3 w-3 fill-current" />
          </div>
          <p className="text-[#111418] text-[10px] font-medium leading-normal tracking-[0.015em]">
            {getTranslation("home", currentLanguage)}
          </p>
        </Link>
        <Link to="/products" className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[#637488] py-0.5">
          <div className="text-[#637488] flex h-4 items-center justify-center">
            <Grid3X3 className="h-3 w-3" />
          </div>
          <p className="text-[#637488] text-[10px] font-medium leading-normal tracking-[0.015em]">
            {getTranslation("categories", currentLanguage)}
          </p>
        </Link>
        <Link to="/messages" className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[#637488] py-0.5">
          <div className="text-[#637488] flex h-4 items-center justify-center">
            <MessageCircle className="h-3 w-3" />
          </div>
          <p className="text-[#637488] text-[10px] font-medium leading-normal tracking-[0.015em]">
            {getTranslation("messages", currentLanguage)}
          </p>
        </Link>
        <Link to="/cart" className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[#637488] py-0.5">
          <div className="text-[#637488] flex h-4 items-center justify-center">
            <ShoppingCart className="h-3 w-3" />
          </div>
          <p className="text-[#637488] text-[10px] font-medium leading-normal tracking-[0.015em]">
            {getTranslation("cart", currentLanguage)}
          </p>
        </Link>
        <Link to="/tips" className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[#637488] py-0.5">
          <div className="text-[#637488] flex h-4 items-center justify-center">
            <Lightbulb className="h-3 w-3" />
          </div>
          <p className="text-[#637488] text-[10px] font-medium leading-normal tracking-[0.015em]">
            {getTranslation("tips", currentLanguage)}
          </p>
        </Link>
        <Link to="/profile" className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[#637488] py-0.5">
          <div className="text-[#637488] flex h-4 items-center justify-center">
            <User className="h-3 w-3" />
          </div>
          <p className="text-[#637488] text-[10px] font-medium leading-normal tracking-[0.015em]">
            {getTranslation("profile", currentLanguage)}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default FixedFooter;
