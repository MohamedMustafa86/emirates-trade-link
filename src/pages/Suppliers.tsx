import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Truck, Globe, Star, Users, Package, Search, Menu, Home, Grid3X3, MessageCircle, User, Shield } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import { getTranslation } from "@/utils/translations";
import { useLanguage } from "@/hooks/useLanguage";

const Suppliers = () => {
  const { currentLanguage, handleLanguageChange } = useLanguage();

  const suppliers = [
    {
      nameAr: "مجموعة التجارة الخليجية",
      nameEn: "Gulf Trading Group",
      nameFr: "Groupe commercial du Golfe",
      locationAr: "دبي، الإمارات العربية المتحدة",
      locationEn: "Dubai, United Arab Emirates",
      locationFr: "Dubaï, Émirats arabes unis",
      specializationAr: "الاستيراد والتصدير",
      specializationEn: "Import and Export",
      specializationFr: "Import et export",
      rating: 4.9,
      orders: 1250,
      verified: true,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
    },
    {
      nameAr: "شركة الشرق الأوسط للتوريد",
      nameEn: "Middle East Supply Company",
      nameFr: "Compagnie d'approvisionnement du Moyen-Orient",
      locationAr: "الرياض، المملكة العربية السعودية",
      locationEn: "Riyadh, Saudi Arabia",
      locationFr: "Riyad, Arabie saoudite",
      specializationAr: "المواد الخام والكيماويات",
      specializationEn: "Raw Materials and Chemicals",
      specializationFr: "Matières premières et produits chimiques",
      rating: 4.8,
      orders: 890,
      verified: true,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43"
    },
    {
      nameAr: "موردو الخليج المتحد",
      nameEn: "United Gulf Suppliers",
      nameFr: "Fournisseurs unis du Golfe",
      locationAr: "الكويت، الكويت",
      locationEn: "Kuwait City, Kuwait",
      locationFr: "Ville de Koweït, Koweït",
      specializationAr: "الإلكترونيات والتقنية",
      specializationEn: "Electronics and Technology",
      specializationFr: "Électronique et technologie",
      rating: 4.7,
      orders: 650,
      verified: false,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },
    {
      nameAr: "شبكة التوريد العربية",
      nameEn: "Arab Supply Network",
      nameFr: "Réseau d'approvisionnement arabe",
      locationAr: "الدوحة، قطر",
      locationEn: "Doha, Qatar",
      locationFr: "Doha, Qatar",
      specializationAr: "المنتجات الاستهلاكية",
      specializationEn: "Consumer Products",
      specializationFr: "Produits de consommation",
      rating: 4.6,
      orders: 420,
      verified: true,
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3"
    }
  ];

  const getSupplierName = (supplier: any) => {
    return currentLanguage === "العربية" ? supplier.nameAr : 
           currentLanguage === "English" ? supplier.nameEn : supplier.nameFr;
  };

  const getSupplierLocation = (supplier: any) => {
    return currentLanguage === "العربية" ? supplier.locationAr : 
           currentLanguage === "English" ? supplier.locationEn : supplier.locationFr;
  };

  const getSupplierSpecialization = (supplier: any) => {
    return currentLanguage === "العربية" ? supplier.specializationAr : 
           currentLanguage === "English" ? supplier.specializationEn : supplier.specializationFr;
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
            {getTranslation("suppliers", currentLanguage)} {getTranslation("verifiedSuppliers", currentLanguage).split(" ")[1]}
          </h1>
          
          <div className="grid gap-6">
            {suppliers.map((supplier, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3 gap-0">
                    <div className="md:col-span-1">
                      <img 
                        src={supplier.image} 
                        alt={getSupplierName(supplier)}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:col-span-2 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{getSupplierName(supplier)}</h3>
                            {supplier.verified && (
                              <Shield className="h-5 w-5 text-green-600" />
                            )}
                          </div>
                          <p className="text-gray-600 mb-1 flex items-center">
                            <Globe className="h-4 w-4 ml-2" />
                            {getSupplierLocation(supplier)}
                          </p>
                          <p className="text-gray-600 mb-3 flex items-center">
                            <Truck className="h-4 w-4 ml-2" />
                            {getSupplierSpecialization(supplier)}
                          </p>
                        </div>
                        <div className="text-left">
                          <div className="flex items-center mb-2">
                            <Star className="h-4 w-4 text-yellow-500 ml-1" />
                            <span className="font-semibold">{supplier.rating}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Package className="h-4 w-4 ml-1" />
                            <span>{supplier.orders} {currentLanguage === "العربية" ? "طلب مكتمل" : currentLanguage === "English" ? "completed orders" : "commandes terminées"}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          {currentLanguage === "العربية" ? "عرض المنتجات" : currentLanguage === "English" ? "View Products" : "Voir les produits"}
                          <ArrowLeft className="mr-2 h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                          {getTranslation("requestQuote", currentLanguage)}
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
        <Link to="/messages" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#637488]">
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

export default Suppliers;
