
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Building, Globe, Star, Users, Package, Search, Menu, Home, Grid3X3, MessageCircle, User } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import { getTranslation } from "@/utils/translations";

const Manufacturers = () => {
  const [currentLanguage, setCurrentLanguage] = useState("العربية");

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    console.log(`Language changed to: ${language}`);
    
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
    
    document.documentElement.style.setProperty('--text-direction', language === "العربية" ? 'rtl' : 'ltr');
  };

  const manufacturers = [
    {
      nameAr: "مصنع الإمارات للبلاستيك",
      nameEn: "Emirates Plastic Factory",
      nameFr: "Usine de Plastique des Émirats",
      locationAr: "دبي، الإمارات العربية المتحدة",
      locationEn: "Dubai, United Arab Emirates",
      locationFr: "Dubaï, Émirats arabes unis",
      specializationAr: "المواد البلاستيكية والتعبئة",
      specializationEn: "Plastic Materials and Packaging",
      specializationFr: "Matériaux plastiques et emballage",
      rating: 4.8,
      products: 150,
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3"
    },
    {
      nameAr: "مجموعة السعودية للصناعات",
      nameEn: "Saudi Industrial Group",
      nameFr: "Groupe industriel saoudien",
      locationAr: "الرياض، المملكة العربية السعودية",
      locationEn: "Riyadh, Saudi Arabia",
      locationFr: "Riyad, Arabie saoudite",
      specializationAr: "مواد البناء والإنشاء",
      specializationEn: "Building and Construction Materials",
      specializationFr: "Matériaux de construction",
      rating: 4.9,
      products: 280,
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5"
    },
    {
      nameAr: "شركة قطر للكيماويات",
      nameEn: "Qatar Chemical Company",
      nameFr: "Compagnie chimique du Qatar",
      locationAr: "الدوحة، قطر",
      locationEn: "Doha, Qatar",
      locationFr: "Doha, Qatar",
      specializationAr: "المواد الكيميائية والبتروكيماويات",
      specializationEn: "Chemicals and Petrochemicals",
      specializationFr: "Produits chimiques et pétrochimiques",
      rating: 4.7,
      products: 95,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },
    {
      nameAr: "مصانع الكويت المتطورة",
      nameEn: "Advanced Kuwait Factories",
      nameFr: "Usines avancées du Koweït",
      locationAr: "الكويت، الكويت",
      locationEn: "Kuwait City, Kuwait",
      locationFr: "Ville de Koweït, Koweït",
      specializationAr: "الإلكترونيات والمعدات",
      specializationEn: "Electronics and Equipment",
      specializationFr: "Électronique et équipement",
      rating: 4.6,
      products: 220,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43"
    }
  ];

  const getManufacturerName = (manufacturer: any) => {
    return currentLanguage === "العربية" ? manufacturer.nameAr : 
           currentLanguage === "English" ? manufacturer.nameEn : manufacturer.nameFr;
  };

  const getManufacturerLocation = (manufacturer: any) => {
    return currentLanguage === "العربية" ? manufacturer.locationAr : 
           currentLanguage === "English" ? manufacturer.locationEn : manufacturer.locationFr;
  };

  const getManufacturerSpecialization = (manufacturer: any) => {
    return currentLanguage === "العربية" ? manufacturer.specializationAr : 
           currentLanguage === "English" ? manufacturer.specializationEn : manufacturer.specializationFr;
  };

  return (
    <div 
      className="relative flex min-h-screen flex-col bg-gray-50" 
      dir={currentLanguage === "العربية" ? "rtl" : "ltr"} 
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <Header 
        currentLanguage={currentLanguage} 
        onLanguageChange={handleLanguageChange} 
      />

      <div className="pt-32">
        <main className="flex-1 p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {getTranslation("manufacturers", currentLanguage)} {getTranslation("verifiedSuppliers", currentLanguage).split(" ")[1]}
          </h1>
          
          <div className="grid gap-6">
            {manufacturers.map((manufacturer, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3 gap-0">
                    <div className="md:col-span-1">
                      <img 
                        src={manufacturer.image} 
                        alt={getManufacturerName(manufacturer)}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:col-span-2 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{getManufacturerName(manufacturer)}</h3>
                          <p className="text-gray-600 mb-1 flex items-center">
                            <Globe className="h-4 w-4 ml-2" />
                            {getManufacturerLocation(manufacturer)}
                          </p>
                          <p className="text-gray-600 mb-3 flex items-center">
                            <Building className="h-4 w-4 ml-2" />
                            {getManufacturerSpecialization(manufacturer)}
                          </p>
                        </div>
                        <div className="text-left">
                          <div className="flex items-center mb-2">
                            <Star className="h-4 w-4 text-yellow-500 ml-1" />
                            <span className="font-semibold">{manufacturer.rating}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Package className="h-4 w-4 ml-1" />
                            <span>{manufacturer.products} {currentLanguage === "العربية" ? "منتج" : currentLanguage === "English" ? "products" : "produits"}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          {currentLanguage === "العربية" ? "عرض المنتجات" : currentLanguage === "English" ? "View Products" : "Voir les produits"}
                          <ArrowLeft className="mr-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                          {getTranslation("contactUs", currentLanguage)}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      {/* Bottom Navigation */}
      <div className="flex gap-2 border-t border-[#f0f2f4] bg-white px-4 pb-3 pt-2">
        <Link to="/" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#637488]">
          <div className="text-[#637488] flex h-8 items-center justify-center">
            <Home className="h-6 w-6" />
          </div>
          <p className="text-[#637488] text-xs font-medium leading-normal tracking-[0.015em]">{getTranslation("home", currentLanguage)}</p>
        </Link>
        <Link to="/products" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#637488]">
          <div className="text-[#637488] flex h-8 items-center justify-center">
            <Grid3X3 className="h-6 w-6" />
          </div>
          <p className="text-[#637488] text-xs font-medium leading-normal tracking-[0.015em]">{getTranslation("categories", currentLanguage)}</p>
        </Link>
        <Link to="/contact" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#637488]">
          <div className="text-[#637488] flex h-8 items-center justify-center">
            <MessageCircle className="h-6 w-6" />
          </div>
          <p className="text-[#637488] text-xs font-medium leading-normal tracking-[0.015em]">{getTranslation("messages", currentLanguage)}</p>
        </Link>
        <Link to="/supplier-dashboard" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#637488]">
          <div className="text-[#637488] flex h-8 items-center justify-center">
            <User className="h-6 w-6" />
          </div>
          <p className="text-[#637488] text-xs font-medium leading-normal tracking-[0.015em]">{getTranslation("profile", currentLanguage)}</p>
        </Link>
      </div>
    </div>
  );
};

export default Manufacturers;
