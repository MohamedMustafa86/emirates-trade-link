import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, Globe, Users, TrendingUp, Shield, Clock, Truck, Award, Search, Star, List, User, MessageCircle, Home, Grid3X3, Menu } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: '',
    productsInterest: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('تم تسجيل بياناتك بنجاح! سنتواصل معك قريباً.');
  };

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

  return (
    <div className="relative flex min-h-screen flex-col bg-white" dir="rtl" style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}>
      {/* Header */}
      <div className="flex items-center bg-white p-4 pb-2 justify-between border-b border-gray-100">
        <div className="text-[#111418] flex size-12 shrink-0 items-center">
          <Menu className="h-6 w-6" />
        </div>
        
        {/* Logo */}
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
              placeholder="ما الذي تبحث عنه؟"
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
              className="px-6 py-4 text-base font-medium text-[#111418] border-b-2 border-orange-500 bg-white"
            >
              المنتجات
            </Link>
            <Link 
              to="/manufacturers" 
              className="px-6 py-4 text-base font-medium text-[#637488] hover:text-[#111418] transition-colors"
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

      {/* Business Section */}
      <div className="bg-white px-4 py-6">
        <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] mb-4">لأعمالك</h2>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-orange-500 rounded-lg p-4 text-white text-center">
            <div className="flex justify-center mb-2">
              <Grid3X3 className="h-8 w-8" />
            </div>
            <p className="text-sm font-medium">جميع الفئات</p>
          </div>
          <div className="bg-blue-600 rounded-lg p-4 text-white text-center">
            <div className="flex justify-center mb-2">
              <MessageCircle className="h-8 w-8" />
            </div>
            <p className="text-sm font-medium">طلب عرض أسعار</p>
          </div>
          <div className="bg-green-700 rounded-lg p-4 text-white text-center">
            <div className="flex justify-center mb-2">
              <Package className="h-8 w-8" />
            </div>
            <p className="text-sm font-medium">مورد أوروبا</p>
          </div>
        </div>
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

        {/* Registration Form Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  سجل و تواصل مع المصانع و الموردين في دول الخليج
                </h2>
                <p className="text-xl text-gray-600 mb-2">سجل مجاناً</p>
                <p className="text-lg text-gray-500">
                  انضم إلى شبكة DUBAIMERX.COM واحصل على إمكانية الوصول المباشر لأفضل المصانع والموردين
                </p>
              </div>

              <Card className="shadow-xl border-0">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="companyName" className="text-base font-medium">
                          اسم الشركة *
                        </Label>
                        <Input
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder="أدخل اسم شركتك"
                          required
                          className="h-12 text-base"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactName" className="text-base font-medium">
                          اسم الشخص المسؤول *
                        </Label>
                        <Input
                          id="contactName"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleInputChange}
                          placeholder="أدخل اسمك الكامل"
                          required
                          className="h-12 text-base"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-base font-medium">
                          البريد الإلكتروني *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="example@company.com"
                          required
                          className="h-12 text-base"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-base font-medium">
                          رقم الهاتف *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+971 50 123 4567"
                          required
                          className="h-12 text-base"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-base font-medium">
                          الدولة *
                        </Label>
                        <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          placeholder="الإمارات العربية المتحدة"
                          required
                          className="h-12 text-base"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="productsInterest" className="text-base font-medium">
                          المنتجات التي تهتم بها
                        </Label>
                        <Textarea
                          id="productsInterest"
                          name="productsInterest"
                          value={formData.productsInterest}
                          onChange={handleInputChange}
                          placeholder="اذكر نوع المنتجات أو الخدمات التي تبحث عنها..."
                          className="min-h-24 text-base"
                        />
                      </div>
                    </div>

                    <div className="text-center pt-4">
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-12 py-4 text-lg"
                      >
                        سجل الآن مجاناً
                        <ArrowLeft className="mr-2 h-5 w-5" />
                      </Button>
                      <p className="text-sm text-gray-500 mt-4">
                        بالتسجيل، أنت توافق على شروط الخدمة وسياسة الخصوصية الخاصة بـ DUBAIMERX.COM
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
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
