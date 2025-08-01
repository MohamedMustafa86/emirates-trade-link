
import { Globe, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";
import { getTranslation, translations } from "@/utils/translations";
import { useState } from "react";
import SearchBar from "./SearchBar";

interface HeaderProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const Header = ({ currentLanguage, onLanguageChange }: HeaderProps) => {
  const t = translations[currentLanguage === "العربية" ? "ar" : currentLanguage === "English" ? "en" : "fr"];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActivePath = (path: string) => {
    return location.pathname === path || (path === "/products" && location.pathname.startsWith("/products"));
  };
  
  const languages = [
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" }
  ];

  const navigationItems = [
    { title: getTranslation("home", currentLanguage), href: "/" },
    { title: getTranslation("aboutUs", currentLanguage), href: "/about" },
    { title: getTranslation("productsNav", currentLanguage), href: "/products" },
    { title: getTranslation("partnersManufacturers", currentLanguage), href: "/partners" },
    { title: getTranslation("supplyLogistics", currentLanguage), href: "/logistics" },
    { title: getTranslation("contactUs", currentLanguage), href: "/contact" },
    { title: getTranslation("registerBuyers", currentLanguage), href: "/auth" },
    { title: getTranslation("registerSuppliers", currentLanguage), href: "/supplier-registration" },
  ];

  const isRTL = currentLanguage === "العربية";

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40">
      {/* Header */}
      <div className="flex items-center bg-white px-2 py-1.5 justify-between border-b border-gray-100">
        {/* Menu Icon - Left Side */}
        <div className="text-[#111418] flex size-6 shrink-0 items-center justify-start">
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center p-1 hover:bg-gray-100 rounded-md transition-colors">
                <Menu className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 bg-white border border-gray-200 shadow-lg z-50">
              {navigationItems.map((item) => (
                <DropdownMenuItem key={item.title} asChild>
                  <Link
                    to={item.href}
                    className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer text-right w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-sm font-medium text-gray-700">{item.title}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Logo - Center */}
        <div className="flex items-center justify-center flex-1">
          <img 
            src="/lovable-uploads/8b27315a-9e7d-4683-a231-655339f73994.png" 
            alt={`${t.siteName} Logo`} 
            className="h-7 w-auto object-contain"
          />
        </div>
        
        {/* Language Dropdown - Right Side */}
        <div className="flex w-6 items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-6 bg-transparent text-[#111418] gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0 hover:bg-gray-100 transition-colors">
                <Globe className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200 shadow-lg z-50">
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  onClick={() => onLanguageChange(language.name)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer"
                >
                  <span className="text-xl">{language.flag}</span>
                  <span className="text-sm font-medium text-gray-700">{language.name}</span>
                  {currentLanguage === language.name && (
                    <span className="ml-auto text-blue-600">✓</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Search Section */}
      <div className="px-4 py-2 bg-white">
        <SearchBar placeholder={getTranslation("searchPlaceholder", currentLanguage)} />
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[hsl(var(--burgundy))] border-b border-burgundy-dark">
        <div className="flex justify-center">
          <div className="flex">
            <Link 
              to="/products" 
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isActivePath("/products") 
                  ? "text-white border-b-2 border-white" 
                  : "text-white/80 hover:text-white"
              }`}
            >
              {getTranslation("products", currentLanguage)}
            </Link>
            <Link 
              to="/manufacturers" 
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isActivePath("/manufacturers") 
                  ? "text-white border-b-2 border-white" 
                  : "text-white/80 hover:text-white"
              }`}
            >
              {getTranslation("manufacturers", currentLanguage)}
            </Link>
            <Link 
              to="/suppliers" 
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isActivePath("/suppliers") 
                  ? "text-white border-b-2 border-white" 
                  : "text-white/80 hover:text-white"
              }`}
            >
              {getTranslation("suppliers", currentLanguage)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
