
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, Globe, Users, TrendingUp, Shield, Clock, Truck, Award, Search, Star } from "lucide-react";

const Index = () => {
  const stats = [
    { number: "500+", label: "موردين معتمدين", icon: <Users className="h-8 w-8 text-blue-600" /> },
    { number: "10,000+", label: "منتج متاح", icon: <Package className="h-8 w-8 text-blue-600" /> },
    { number: "50+", label: "دولة مستهدفة", icon: <Globe className="h-8 w-8 text-blue-600" /> },
    { number: "95%", label: "رضا العملاء", icon: <TrendingUp className="h-8 w-8 text-blue-600" /> }
  ];

  const features = [
    {
      title: "جودة مضمونة",
      description: "منتجات من مصانع معتمدة وموثوقة عالمياً",
      icon: <Shield className="h-12 w-12 text-blue-600" />
    },
    {
      title: "توصيل سريع",
      description: "خدمات لوجستية متطورة وتوصيل في الوقت المحدد",
      icon: <Clock className="h-12 w-12 text-blue-600" />
    },
    {
      title: "شحن عالمي",
      description: "نصل إلى أكثر من 50 دولة حول العالم",
      icon: <Truck className="h-12 w-12 text-blue-600" />
    },
    {
      title: "دعم متميز",
      description: "فريق دعم فني متخصص متاح على مدار الساعة",
      icon: <Award className="h-12 w-12 text-blue-600" />
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
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navigation />
      
      {/* GCC Flags Section */}
      <div className="bg-white border-b">
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
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
              منصة دبي مركس
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              المنصة الرائدة لتسويق وعرض المنتجات الإماراتية والخليجية للأسواق العالمية والأفريقية والشرق أوسطية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/products">
                  استكشف المنتجات
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link to="/contact">
                  ابدأ التصدير
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-4">
                      {stat.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">منتجات مميزة</h2>
              <p className="text-xl text-gray-600">اكتشف أفضل المنتجات الخليجية والإماراتية</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  name: "تمور عجوة المدينة",
                  image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b",
                  price: "45 درهم",
                  origin: "السعودية"
                },
                {
                  name: "زيت الزيتون البكر",
                  image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
                  price: "85 درهم",
                  origin: "الإمارات"
                },
                {
                  name: "العود الخليجي الفاخر",
                  image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c",
                  price: "250 درهم",
                  origin: "الإمارات"
                },
                {
                  name: "الحرف اليدوية التراثية",
                  image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
                  price: "120 درهم",
                  origin: "قطر"
                }
              ].map((product, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-2">{product.name}</h3>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-blue-600 font-bold">{product.price}</span>
                        <span className="text-sm text-gray-500">{product.origin}</span>
                      </div>
                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 mr-2">(4.8)</span>
                      </div>
                      <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                        عرض التفاصيل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link to="/search">
                  <Search className="ml-2 h-5 w-5" />
                  البحث المتقدم
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">لماذا تختار دبي مركس؟</h2>
              <p className="text-xl text-gray-600">نحن نقدم أفضل الخدمات لضمان نجاح تجارتك</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">ابدأ رحلتك التجارية معنا</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              انضم إلى آلاف الموردين والمشترين الذين يثقون بمنصة دبي مركس
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/supplier-dashboard">
                  للموردين - ابدأ البيع
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
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
