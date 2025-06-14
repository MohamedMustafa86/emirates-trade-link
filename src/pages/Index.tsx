
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, Globe, Users, TrendingUp, Shield, Truck, Search, Home, Grid3X3, Menu, MessageCircle, User, Factory, MapPin, CheckCircle, ShoppingCart, Lightbulb } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RegistrationDialog from "@/components/RegistrationDialog";
import SupplierRegistrationDialog from "@/components/SupplierRegistrationDialog";
import { useState } from "react";

const Index = () => {
  const [currentLanguage, setCurrentLanguage] = useState("العربية");

  const languages = [
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" }
  ];

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

  const stats = [
    { number: "500+", label: "موردين معتمدين", icon: <Users className="h-8 w-8 text-emerald-600" /> },
    { number: "10,000+", label: "منتج متاح", icon: <Package className="h-8 w-8 text-emerald-600" /> },
    { number: "50+", label: "دولة مستهدفة", icon: <Globe className="h-8 w-8 text-emerald-600" /> },
    { number: "95%", label: "رضا العملاء", icon: <TrendingUp className="h-8 w-8 text-emerald-600" /> }
  ];

  const productCategories = [
    {
      title: "المنتجات الاستهلاكية",
      emoji: "🧴",
      description: "العطور، مستحضرات التجميل، مواد التنظيف والعناية الشخصية",
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
      link: "/products/consumer-goods",
      subcategories: ["العطور", "مستحضرات التجميل", "مواد التنظيف", "العناية الشخصية"]
    },
    {
      title: "المنتجات الغذائية",
      emoji: "🍱",
      description: "التمور ومشتقاتها، الألبان والعصائر، الأغذية المعلبة",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      link: "/products/food-products",
      subcategories: ["التمور ومشتقاتها", "الألبان والعصائر", "الأغذية المعلبة والمجمدة", "التوابل والزيوت"]
    },
    {
      title: "مواد البناء والتشطيب",
      emoji: "🏗️",
      description: "السيراميك والبورسلين، الزجاج الصناعي، الأدوات الصحية",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      link: "/products/building-materials",
      subcategories: ["السيراميك والبورسلين", "الزجاج الصناعي", "الأدوات الصحية", "الألمنيوم والحديد"]
    },
    {
      title: "المنتجات الصناعية",
      emoji: "⚙️",
      description: "الأنابيب والكابلات، المعدات الكهربائية، المنتجات البلاستيكية",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3",
      link: "/products/industrial-products",
      subcategories: ["الأنابيب والكابلات", "المعدات الكهربائية", "المنتجات البلاستيكية", "الفلاتر والمكونات الصناعية"]
    },
    {
      title: "منتجات تقنية وذكية",
      emoji: "💡",
      description: "أجهزة المراقبة، حلول المنازل الذكية، تطبيقات وخدمات SaaS",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      link: "/products/smart-tech",
      subcategories: ["أجهزة المراقبة", "حلول المنازل الذكية", "تطبيقات وخدمات SaaS", "أجهزة إلكترونية خفيفة"]
    },
    {
      title: "المنتجات الطبية والصحية",
      emoji: "💊",
      description: "الأدوية والمكملات، القفازات والكمامات، أدوات الإسعاف الأولي",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      link: "/products/medical-health",
      subcategories: ["الأدوية والمكملات", "القفازات والكمامات", "أدوات الإسعاف الأولي", "العبوات الطبية"]
    },
    {
      title: "منتجات التعبئة والتغليف",
      emoji: "📦",
      description: "عبوات بلاستيكية وزجاجية، لفائف تغليف وصناديق، ملصقات وباركودات",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
      link: "/products/packaging-supplies",
      subcategories: ["عبوات بلاستيكية وزجاجية", "لفائف تغليف وصناديق", "ملصقات وباركودات", "حلول تغليف صديقة للبيئة"]
    },
    {
      title: "الأثاث والمفروشات",
      emoji: "🪑",
      description: "أثاث خشبي ومعدني، مفروشات فندقية، مراتب وستائر",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
      link: "/products/furniture",
      subcategories: ["أثاث خشبي ومعدني", "مفروشات فندقية", "مراتب وستائر", "سجاد وسجاد صناعي"]
    },
    {
      title: "المنتجات المستدامة",
      emoji: "🌿",
      description: "منتجات قابلة للتحلل، أنظمة طاقة شمسية، حلول تدوير",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      link: "/products/sustainable",
      subcategories: ["منتجات قابلة للتحلل", "أنظمة طاقة شمسية", "حلول تدوير", "أدوات توفير المياه والطاقة"]
    }
  ];

  const benefits = [
    {
      title: "التواصل مع الأسواق العالمية",
      description: "وسع نطاق السوق لتصل إلى أفريقيا والشرق الأوسط وآسيا وأوروبا وما بعدها",
      icon: <Users className="h-6 w-6 text-[#111418]" />
    },
    {
      title: "معاملات آمنة",
      description: "ضمان المعاملات الآمنة والموثوقة مع نظام الدفع الآمن",
      icon: <Shield className="h-6 w-6 text-[#111418]" />
    },
    {
      title: "لوجستيات فعالة",
      description: "تبسيط عملية الشحن مع حلول اللوجستيات المتكاملة",
      icon: <Truck className="h-6 w-6 text-[#111418]" />
    }
  ];

  return (
    <div className="relative flex min-h-screen flex-col bg-white pb-10" dir="rtl" style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}>
      {/* Header */}
      <div className="flex items-center bg-white p-2 pb-1 justify-between border-b border-gray-100">
        <div className="text-[#111418] flex size-8 shrink-0 items-center">
          <Menu className="h-4 w-4" />
        </div>
        
        {/* Logo */}
        <div className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/8b27315a-9e7d-4683-a231-655339f73994.png" 
            alt="DUBAIMERX.COM Logo" 
            className="h-5 w-auto object-contain"
          />
        </div>
        
        {/* Language Dropdown */}
        <div className="flex w-8 items-center justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 bg-transparent text-[#111418] gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0 hover:bg-gray-100 transition-colors">
                <Globe className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200 shadow-lg z-50">
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  onClick={() => handleLanguageChange(language.name)}
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
      <div className="px-6 py-3 bg-white">
        <div className="max-w-xs mx-auto">
          <label className="flex flex-col min-w-40 h-9 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-full h-full shadow-sm">
              <div className="text-[#637488] flex border border-gray-200 bg-gray-50 items-center justify-center pl-3 rounded-r-full border-l-0">
                <Search className="h-3.5 w-3.5" />
              </div>
              <input
                placeholder="ما الذي تبحث عنه؟"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full text-[#111418] focus:outline-0 focus:ring-2 focus:ring-blue-500 focus:border-transparent border border-gray-200 bg-gray-50 h-full placeholder:text-[#637488] px-3 rounded-r-none border-r-0 pr-2 text-sm font-normal leading-normal transition-all duration-200"
              />
            </div>
          </label>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex justify-center">
          <div className="flex">
            <Link 
              to="/products" 
              className="px-6 py-3 text-base font-medium text-[#111418] border-b-2 border-orange-500 bg-white"
            >
              المنتجات
            </Link>
            <Link 
              to="/manufacturers" 
              className="px-6 py-3 text-base font-medium text-[#637488] hover:text-[#111418] transition-colors"
            >
              المصنعون
            </Link>
            <Link 
              to="/suppliers" 
              className="px-6 py-3 text-base font-medium text-[#637488] hover:text-[#111418] transition-colors"
            >
              الموردون
            </Link>
          </div>
        </div>
      </div>

      {/* Business Section */}
      <div className="bg-white px-4 py-5">
        <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-3">لأعمالك</h2>
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-orange-500 rounded-lg p-3 text-white text-center">
            <div className="flex justify-center mb-2">
              <Grid3X3 className="h-6 w-6" />
            </div>
            <p className="text-xs font-medium">جميع الفئات</p>
          </div>
          <div className="bg-blue-600 rounded-lg p-3 text-white text-center">
            <div className="flex justify-center mb-2">
              <MessageCircle className="h-6 w-6" />
            </div>
            <p className="text-xs font-medium">طلب عرض أسعار</p>
          </div>
          <div className="bg-green-700 rounded-lg p-3 text-white text-center">
            <div className="flex justify-center mb-2">
              <Package className="h-6 w-6" />
            </div>
            <p className="text-xs font-medium">مورد أوروبا</p>
          </div>
          <SupplierRegistrationDialog>
            <div className="bg-purple-600 rounded-lg p-3 text-white text-center cursor-pointer hover:bg-purple-700 transition-colors">
              <div className="flex justify-center mb-2">
                <Factory className="h-6 w-6" />
              </div>
              <p className="text-xs font-medium">سجل كمورد</p>
            </div>
          </SupplierRegistrationDialog>
        </div>
      </div>

      <main className="flex-1">
        {/* Product Categories */}
        <section className="py-8">
          <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3">فئات المنتجات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {productCategories.map((category, index) => (
              <Link key={index} to={category.link} className="block">
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 h-full">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={category.image} 
                        alt={category.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <span className="text-2xl">{category.emoji}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{category.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{category.description}</p>
                      <div className="space-y-1">
                        {category.subcategories.slice(0, 2).map((sub, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-500">
                            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full ml-2"></div>
                            {sub}
                          </div>
                        ))}
                        {category.subcategories.length > 2 && (
                          <div className="text-xs text-blue-600 font-medium">
                            +{category.subcategories.length - 2} المزيد
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Platform Benefits */}
        <section className="py-8">
          <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3">فوائد المنصة</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-1 gap-3 rounded-lg border border-[#dce0e5] bg-white p-4 flex-col">
                <div className="text-[#111418]">
                  {benefit.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#111418] text-base font-bold leading-tight">{benefit.title}</h2>
                  <p className="text-[#637488] text-sm font-normal leading-normal">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow bg-white border-0">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-4">
                      {stat.icon}
                    </div>
                    <h3 className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                    <p className="text-gray-600 text-lg">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Promotional Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:text-right">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  احصل على منتجاتك من الإمارات والسعودية
                </h2>
                <p className="text-xl mb-8 opacity-90 leading-relaxed">
                  بكل سهولة وأمان مع خدمات الشحن والتوصيل المتطورة
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                    <MapPin className="h-6 w-6 text-yellow-300" />
                    <span className="font-medium">الإمارات العربية المتحدة</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                    <MapPin className="h-6 w-6 text-yellow-300" />
                    <span className="font-medium">المملكة العربية السعودية</span>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <CheckCircle className="h-8 w-8 text-yellow-300" />
                    مميزاتنا
                  </h3>
                  <ul className="space-y-3 text-lg">
                    <li className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-yellow-300" />
                      معاملات آمنة ومضمونة
                    </li>
                    <li className="flex items-center gap-3">
                      <Truck className="h-5 w-5 text-yellow-300" />
                      شحن سريع وموثوق
                    </li>
                    <li className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-yellow-300" />
                      دعم عملاء على مدار الساعة
                    </li>
                    <li className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-yellow-300" />
                      منتجات عالية الجودة
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">ابدأ رحلتك التجارية مع DUBAIMERX.COM</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700 leading-relaxed">
              انضم إلى آلاف الموردين والمشترين الذين يثقون بمنصة DUBAIMERX.COM
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <RegistrationDialog>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                  سجل مجاناً للمشترين
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
              </RegistrationDialog>
              <SupplierRegistrationDialog>
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
                  سجل كمورد أو مصنع
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
              </SupplierRegistrationDialog>
            </div>
          </div>
        </section>
      </main>

      {/* Fixed Footer - Further reduced height */}
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
            <p className="text-[#111418] text-[10px] font-medium leading-normal tracking-[0.015em]">الرئيسية</p>
          </Link>
          <Link to="/products" className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[#637488] py-0.5">
            <div className="text-[#637488] flex h-4 items-center justify-center">
              <Grid3X3 className="h-3 w-3" />
            </div>
            <p className="text-[#637488] text-[10px] font-medium leading-normal tracking-[0.015em]">الفئات</p>
          </Link>
          <Link to="/messages" className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[#637488] py-0.5">
            <div className="text-[#637488] flex h-4 items-center justify-center">
              <MessageCircle className="h-3 w-3" />
            </div>
            <p className="text-[#637488] text-[10px] font-medium leading-normal tracking-[0.015em]">الرسائل</p>
          </Link>
          <Link to="/cart" className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[#637488] py-0.5">
            <div className="text-[#637488] flex h-4 items-center justify-center">
              <ShoppingCart className="h-3 w-3" />
            </div>
            <p className="text-[#637488] text-[10px] font-medium leading-normal tracking-[0.015em]">العربة</p>
          </Link>
          <Link to="/tips" className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[#637488] py-0.5">
            <div className="text-[#637488] flex h-4 items-center justify-center">
              <Lightbulb className="h-3 w-3" />
            </div>
            <p className="text-[#637488] text-[10px] font-medium leading-normal tracking-[0.015em]">نصائح</p>
          </Link>
          <Link to="/supplier-dashboard" className="flex flex-1 flex-col items-center justify-center gap-0.5 text-[#637488] py-0.5">
            <div className="text-[#637488] flex h-4 items-center justify-center">
              <User className="h-3 w-3" />
            </div>
            <p className="text-[#637488] text-[10px] font-medium leading-normal tracking-[0.015em]">الملف</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
