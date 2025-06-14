import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Building, Globe, Star, Users, Package, Search, Menu, Home, Grid3X3, MessageCircle, User } from "lucide-react";

const Manufacturers = () => {
  const manufacturers = [
    {
      name: "مصنع الإمارات للبلاستيك",
      location: "دبي، الإمارات العربية المتحدة",
      specialization: "المواد البلاستيكية والتعبئة",
      rating: 4.8,
      products: 150,
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3"
    },
    {
      name: "مجموعة السعودية للصناعات",
      location: "الرياض، المملكة العربية السعودية",
      specialization: "مواد البناء والإنشاء",
      rating: 4.9,
      products: 280,
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5"
    },
    {
      name: "شركة قطر للكيماويات",
      location: "الدوحة، قطر",
      specialization: "المواد الكيميائية والبتروكيماويات",
      rating: 4.7,
      products: 95,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },
    {
      name: "مصانع الكويت المتطورة",
      location: "الكويت، الكويت",
      specialization: "الإلكترونيات والمعدات",
      rating: 4.6,
      products: 220,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43"
    }
  ];

  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50" dir="rtl" style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}>
      {/* Header */}
      <div className="flex items-center bg-white p-4 pb-2 justify-between border-b border-gray-100">
        <div className="text-[#111418] flex size-12 shrink-0 items-center">
          <Menu className="h-6 w-6" />
        </div>
        
        <div className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/8b27315a-9e7d-4683-a231-655339f73994.png" 
            alt="DUBAIMERX.COM Logo" 
            className="h-10 w-auto object-contain"
          />
        </div>
        
        <div className="flex w-12 items-center justify-end">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 bg-transparent text-[#111418] gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
            <Globe className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="px-4 py-3 bg-white">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div className="text-[#637488] flex border-none bg-[#f0f2f4] items-center justify-center pl-4 rounded-l-xl border-r-0">
              <Search className="h-6 w-6" />
            </div>
            <input
              placeholder="البحث عن المصنعين"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] focus:border-none h-full placeholder:text-[#637488] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
            />
          </div>
        </label>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex justify-center">
          <div className="flex">
            <Link 
              to="/products" 
              className="px-6 py-4 text-base font-medium text-[#637488] hover:text-[#111418] transition-colors"
            >
              المنتجات
            </Link>
            <Link 
              to="/manufacturers" 
              className="px-6 py-4 text-base font-medium text-[#111418] border-b-2 border-orange-500 bg-white"
            >
              المصنعون
            </Link>
            <Link 
              to="/suppliers" 
              className="px-6 py-4 text-base font-medium text-[#637488] hover:text-[#111418] transition-colors"
            >
              الموردون
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">المصنعون المعتمدون</h1>
        
        <div className="grid gap-6">
          {manufacturers.map((manufacturer, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-3 gap-0">
                  <div className="md:col-span-1">
                    <img 
                      src={manufacturer.image} 
                      alt={manufacturer.name}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-2 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{manufacturer.name}</h3>
                        <p className="text-gray-600 mb-1 flex items-center">
                          <Globe className="h-4 w-4 ml-2" />
                          {manufacturer.location}
                        </p>
                        <p className="text-gray-600 mb-3 flex items-center">
                          <Building className="h-4 w-4 ml-2" />
                          {manufacturer.specialization}
                        </p>
                      </div>
                      <div className="text-left">
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 text-yellow-500 ml-1" />
                          <span className="font-semibold">{manufacturer.rating}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Package className="h-4 w-4 ml-1" />
                          <span>{manufacturer.products} منتج</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        عرض المنتجات
                        <ArrowLeft className="mr-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                        تواصل معنا
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="flex gap-2 border-t border-[#f0f2f4] bg-white px-4 pb-3 pt-2">
        <Link to="/" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#637488]">
          <div className="text-[#637488] flex h-8 items-center justify-center">
            <Home className="h-6 w-6" />
          </div>
          <p className="text-[#637488] text-xs font-medium leading-normal tracking-[0.015em]">الرئيسية</p>
        </Link>
        <Link to="/products" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#637488]">
          <div className="text-[#637488] flex h-8 items-center justify-center">
            <Grid3X3 className="h-6 w-6" />
          </div>
          <p className="text-[#637488] text-xs font-medium leading-normal tracking-[0.015em]">الفئات</p>
        </Link>
        <Link to="/contact" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#637488]">
          <div className="text-[#637488] flex h-8 items-center justify-center">
            <MessageCircle className="h-6 w-6" />
          </div>
          <p className="text-[#637488] text-xs font-medium leading-normal tracking-[0.015em]">الرسائل</p>
        </Link>
        <Link to="/supplier-dashboard" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#637488]">
          <div className="text-[#637488] flex h-8 items-center justify-center">
            <User className="h-6 w-6" />
          </div>
          <p className="text-[#637488] text-xs font-medium leading-normal tracking-[0.015em]">الملف الشخصي</p>
        </Link>
      </div>
    </div>
  );
};

export default Manufacturers;
