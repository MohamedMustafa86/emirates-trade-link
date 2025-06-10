
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, Globe, Users, TrendingUp, Shield, Clock, Truck, Award, Search, Star, List, User, MessageCircle, Home, Grid3X3 } from "lucide-react";

const Index = () => {
  const stats = [
    { number: "500+", label: "موردين معتمدين", icon: <Users className="h-8 w-8 text-emerald-600" /> },
    { number: "10,000+", label: "منتج متاح", icon: <Package className="h-8 w-8 text-emerald-600" /> },
    { number: "50+", label: "دولة مستهدفة", icon: <Globe className="h-8 w-8 text-emerald-600" /> },
    { number: "95%", label: "رضا العملاء", icon: <TrendingUp className="h-8 w-8 text-emerald-600" /> }
  ];

  const featuredCategories = [
    {
      title: "الإلكترونيات",
      description: "اكتشف أحدث المنتجات الإلكترونية الاستهلاكية",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      link: "/products"
    },
    {
      title: "الموضة",
      description: "تشكيلة واسعة من المنسوجات والأقمشة",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
      link: "/products"
    },
    {
      title: "الطعام",
      description: "اكتشف المنتجات الزراعية عالية الجودة",
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b",
      link: "/products"
    },
    {
      title: "المنتجات المنزلية",
      description: "مصدر موثوق للمنتجات المنزلية",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3",
      link: "/products"
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

  const gccFlags = [
    { country: "الإمارات", flag: "🇦🇪" },
    { country: "السعودية", flag: "🇸🇦" },
    { country: "الكويت", flag: "🇰🇼" },
    { country: "قطر", flag: "🇶🇦" },
    { country: "البحرين", flag: "🇧🇭" },
    { country: "عمان", flag: "🇴🇲" }
  ];

  return (
    <div className="relative flex min-h-screen flex-col bg-white" dir="rtl" style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}>
      {/* Header */}
      <div className="flex items-center bg-white p-4 pb-2 justify-between">
        <div className="text-[#111418] flex size-12 shrink-0 items-center">
          <List className="h-6 w-6" />
        </div>
        <div className="flex w-12 items-center justify-end">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 bg-transparent text-[#111418] gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
            <Globe className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* GCC Flags Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-center gap-6">
            <span className="text-sm font-medium text-gray-600">دول مجلس التعاون الخليجي:</span>
            <div className="flex items-center gap-4">
              {gccFlags.map((country, index) => (
                <div key={index} className="flex items-center gap-1">
                  <span className="text-2xl">{country.flag}</span>
                  <span className="text-xs text-gray-600 hidden sm:inline">{country.country}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="px-4 py-3">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div className="text-[#637488] flex border-none bg-[#f0f2f4] items-center justify-center pl-4 rounded-l-xl border-r-0">
              <Search className="h-6 w-6" />
            </div>
            <input
              placeholder="البحث عن المنتجات أو الموردين"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border-none bg-[#f0f2f4] focus:border-none h-full placeholder:text-[#637488] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
            />
          </div>
        </label>
      </div>

      <main className="flex-1">
        {/* Featured Products */}
        <section className="py-8">
          <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3">المنتجات المميزة</h2>
          <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-stretch p-4 gap-3">
              {featuredCategories.map((category, index) => (
                <div key={index} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl flex flex-col"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  <p className="text-[#111418] text-base font-medium leading-normal">{category.title}</p>
                </div>
              ))}
            </div>
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

        {/* Call to Action */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">ابدأ رحلتك التجارية معنا</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700 leading-relaxed">
              انضم إلى آلاف الموردين والمشترين الذين يثقون بمنصة دبي مركس
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                <Link to="/supplier-dashboard">
                  للموردين - ابدأ البيع
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <Link to="/search">
                  للمشترين - ابدأ الشراء
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <div className="flex gap-2 border-t border-[#f0f2f4] bg-white px-4 pb-3 pt-2">
        <Link to="/" className="flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-[#111418]">
          <div className="text-[#111418] flex h-8 items-center justify-center">
            <Home className="h-6 w-6 fill-current" />
          </div>
          <p className="text-[#111418] text-xs font-medium leading-normal tracking-[0.015em]">الرئيسية</p>
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

export default Index;
