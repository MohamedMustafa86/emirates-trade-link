
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";

const Navigation = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage === "العربية" ? "ar" : currentLanguage === "English" ? "en" : "fr"];
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { title: "الرئيسية", href: "/" },
    { title: "من نحن", href: "/about" },
    {
      title: "المنتجات",
      href: "/products",
      submenu: [
        { title: "مواد البناء", href: "/products/building-materials" },
        { title: "مواد التعبئة والتغليف", href: "/products/packaging-supplies" },
        { title: "المواد الخام البلاستيكية", href: "/products/plastic-raw-materials" },
        { title: "السلع الاستهلاكية", href: "/products/consumer-goods" },
        { title: "المعدات والآلات", href: "/products/machinery-equipment" },
      ],
    },
    { title: "الشركاء والمصنّعون", href: "/partners" },
    { title: "خدمات التوريد واللوجستيات", href: "/logistics" },
    { title: "تواصل معنا", href: "/contact" },
  ];

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/b9a2938c-03fc-4d35-924b-8e12501bf855.png" 
              alt="Gulf Map" 
              className="h-10 w-10 rounded-lg object-cover"
            />
            <span className="text-xl font-bold text-orange-500 mr-2">{t.siteName}</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navigationItems.map((item) => (
              <div key={item.title} className="relative group">
                {item.submenu ? (
                  <div className="relative">
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-1 rtl:space-x-reverse text-gray-700 hover:text-green-600"
                      onMouseEnter={() => setProductsOpen(true)}
                      onMouseLeave={() => setProductsOpen(false)}
                    >
                      <span className="mr-1">{item.title}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    {productsOpen && (
                      <Card 
                        className="absolute top-full right-0 mt-1 w-64 bg-white shadow-lg z-50 border"
                        onMouseEnter={() => setProductsOpen(true)}
                        onMouseLeave={() => setProductsOpen(false)}
                      >
                        <div className="p-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.title}
                              to={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md transition-colors"
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      </Card>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.href ? 'text-green-600 bg-green-50' : ''
                    }`}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-green-600 p-2"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  {item.submenu ? (
                    <div>
                      <Button
                        variant="ghost"
                        onClick={() => setProductsOpen(!productsOpen)}
                        className="w-full text-right justify-between text-gray-700 hover:text-green-600 hover:bg-green-50"
                      >
                        <span>{item.title}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                      </Button>
                      {productsOpen && (
                        <div className="mr-4 mt-2 space-y-1">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.title}
                              to={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                              onClick={closeMobileMenu}
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors ${
                        location.pathname === item.href ? 'text-green-600 bg-green-50' : ''
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
