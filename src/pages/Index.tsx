
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, Globe, Users, TrendingUp, Shield, Clock, Truck, Award, Search, Star } from "lucide-react";

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
      title: "المنتجات الزراعية",
      description: "اكتشف المنتجات الزراعية عالية الجودة",
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b",
      link: "/products"
    },
    {
      title: "المنسوجات",
      description: "تشكيلة واسعة من المنسوجات والأقمشة",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
      link: "/products"
    },
    {
      title: "المعدات والآلات",
      description: "مصدر موثوق للآلات التجارية",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3",
      link: "/products"
    }
  ];

  const benefits = [
    {
      title: "شبكة واسعة",
      description: "تواصل مع شبكة واسعة من المشترين والبائعين المعتمدين",
      icon: <Users className="h-12 w-12 text-emerald-600" />
    },
    {
      title: "وصول عالمي",
      description: "وسع نطاق السوق لتصل إلى أفريقيا والشرق الأوسط وآسيا وأوروبا وما بعدها",
      icon: <Globe className="h-12 w-12 text-emerald-600" />
    },
    {
      title: "معاملات آمنة",
      description: "استفد من خدمات الدفع الآمنة وضمان التجارة",
      icon: <Shield className="h-12 w-12 text-emerald-600" />
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
    <div className="min-h-screen bg-white" dir="rtl">
      <Navigation />
      
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

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
            }}
          />
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              بوابتك إلى التجارة العالمية B2B
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
              تواصل مع المشترين والبائعين حول العالم. وسع نطاق وصولك وانمِ أعمالك مع منصتنا الموثوقة
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">
                <input
                  type="text"
                  placeholder="البحث عن المنتجات أو الموردين"
                  className="flex-1 px-6 py-4 text-gray-800 text-lg focus:outline-none"
                />
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-none">
                  <Search className="ml-2 h-5 w-5" />
                  بحث
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link to="/products">
                  استكشف المنتجات
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                <Link to="/contact">
                  انضم مجاناً
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">المنتجات المميزة</h2>
              <p className="text-xl text-gray-600">اكتشف أفضل المنتجات في فئات متنوعة</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCategories.map((category, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white border-0">
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{category.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>
                      <Button asChild size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                        <Link to={category.link}>
                          استكشف المزيد
                          <ArrowLeft className="mr-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">لماذا تختار DUBAIMERX.COM؟</h2>
            </div>
            
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">فوائد التجارة معنا</h3>
              <p className="text-lg text-gray-600 mb-12 max-w-4xl mx-auto text-center leading-relaxed">
                DUBAIMERX.COM يوفر منصة آمنة وفعالة للتجارة B2B، تربط الشركات عبر الصناعات والمناطق المتنوعة
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {benefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-6">
                      {benefit.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-4">{benefit.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gray-50">
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
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link to="/supplier-dashboard">
                  للموردين - ابدأ البيع
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                <Link to="/search">
                  للمشترين - ابدأ الشراء
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
