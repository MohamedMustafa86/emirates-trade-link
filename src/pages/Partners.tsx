
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { ArrowRight, Award, MapPin, Users, Globe, Star, Shield } from "lucide-react";

const Partners = () => {
  const partners = [
    {
      name: "شركة التصنيع الألمانية الرائدة",
      country: "ألمانيا",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
      specialties: ["آلات التصنيع", "تقنيات الأتمتة", "معدات الدقة"],
      certifications: ["ISO 9001", "CE", "TÜV"],
      partnership: "10 سنوات",
      description: "شراكة استراتيجية مع أحد أكبر مصنعي المعدات الصناعية في ألمانيا"
    },
    {
      name: "مجموعة التقنيات الآسيوية",
      country: "كوريا الجنوبية",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      specialties: ["الإلكترونيات", "التقنيات الذكية", "أشباه الموصلات"],
      certifications: ["ISO 14001", "KS", "FCC"],
      partnership: "8 سنوات",
      description: "شراكة تقنية مع مجموعة رائدة في مجال التقنيات المتقدمة"
    },
    {
      name: "مصانع المواد الخام الصينية",
      country: "الصين",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3",
      specialties: ["المواد البلاستيكية", "المواد الكيماوية", "التعبئة والتغليف"],
      certifications: ["ISO 9001", "REACH", "CCC"],
      partnership: "12 سنة",
      description: "شبكة واسعة من المصانع المتخصصة في المواد الخام عالية الجودة"
    },
    {
      name: "مجموعة البناء التركية",
      country: "تركيا",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5",
      specialties: ["مواد البناء", "الحديد والصلب", "الخرسانة"],
      certifications: ["TSE", "CE", "ISO 9001"],
      partnership: "6 سنوات",
      description: "تعاون مثمر مع مجموعة رائدة في صناعة مواد البناء"
    },
    {
      name: "شركة الابتكار الأمريكية",
      country: "الولايات المتحدة",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
      specialties: ["التقنيات الطبية", "الأجهزة المتطورة", "حلول الطاقة"],
      certifications: ["FDA", "UL", "ANSI"],
      partnership: "5 سنوات",
      description: "شراكة استراتيجية مع شركة رائدة في الابتكار التقني"
    },
    {
      name: "مصانع الجودة اليابانية",
      country: "اليابان",
      image: "https://images.unsplash.com/photo-1460472178825-e5240623afd5",
      specialties: ["السيارات", "الآلات الدقيقة", "الروبوتات"],
      certifications: ["JIS", "ISO/TS", "JISQ"],
      partnership: "15 سنة",
      description: "شراكة تاريخية مع مصانع يابانية معروفة بجودتها العالية"
    }
  ];

  const stats = [
    { number: "50+", label: "شريك معتمد", icon: <Users className="h-6 w-6" /> },
    { number: "25+", label: "دولة", icon: <Globe className="h-6 w-6" /> },
    { number: "100+", label: "شهادة جودة", icon: <Award className="h-6 w-6" /> },
    { number: "99%", label: "رضا العملاء", icon: <Star className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-lg mb-12">
          <h1 className="text-4xl font-bold mb-4">الشركاء والمصنّعون</h1>
          <p className="text-xl max-w-3xl mx-auto">
            شبكة عالمية من الشركاء الموثوقين والمصنعين المعتمدين لضمان أفضل المنتجات والخدمات
          </p>
        </section>

        {/* Stats Section */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center text-blue-600 mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Partners Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">شركاؤنا حول العالم</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <img 
                    src={partner.image} 
                    alt={partner.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-800">{partner.name}</h3>
                      <div className="flex items-center text-sm text-blue-600">
                        <MapPin className="h-4 w-4 ml-1" />
                        {partner.country}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {partner.description}
                    </p>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">التخصصات:</h4>
                        <div className="flex flex-wrap gap-1">
                          {partner.specialties.map((specialty, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 text-green-600 ml-1" />
                          <span className="text-gray-600">شهادات: {partner.certifications.join(", ")}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-sm">
                        <Award className="h-4 w-4 text-orange-600 ml-1" />
                        <span className="text-gray-600">فترة الشراكة: {partner.partnership}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">مزايا شراكاتنا العالمية</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">جودة مضمونة</h4>
                  <p className="text-sm text-gray-600">شركاء معتمدون بأعلى معايير الجودة</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">تغطية عالمية</h4>
                  <p className="text-sm text-gray-600">شبكة واسعة تغطي القارات الخمس</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">أسعار تنافسية</h4>
                  <p className="text-sm text-gray-600">تعاون مباشر مع المصنعين</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">ابتكار مستمر</h4>
                  <p className="text-sm text-gray-600">أحدث التقنيات والمنتجات</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Certification Standards */}
        <section className="mb-12">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">معايير الشهادات والجودة</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">شهادات الجودة الدولية</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <Award className="h-4 w-4 text-green-600 ml-2" />
                      ISO 9001 - إدارة الجودة
                    </li>
                    <li className="flex items-center">
                      <Award className="h-4 w-4 text-green-600 ml-2" />
                      ISO 14001 - الإدارة البيئية
                    </li>
                    <li className="flex items-center">
                      <Award className="h-4 w-4 text-green-600 ml-2" />
                      ISO 45001 - السلامة المهنية
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">الشهادات التقنية</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <Award className="h-4 w-4 text-blue-600 ml-2" />
                      CE - المطابقة الأوروبية
                    </li>
                    <li className="flex items-center">
                      <Award className="h-4 w-4 text-blue-600 ml-2" />
                      FCC - اللجنة الفيدرالية للاتصالات
                    </li>
                    <li className="flex items-center">
                      <Award className="h-4 w-4 text-blue-600 ml-2" />
                      UL - مختبرات السلامة
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">شهادات التجارة</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <Award className="h-4 w-4 text-purple-600 ml-2" />
                      شهادات الاستيراد والتصدير
                    </li>
                    <li className="flex items-center">
                      <Award className="h-4 w-4 text-purple-600 ml-2" />
                      شهادات المنشأ
                    </li>
                    <li className="flex items-center">
                      <Award className="h-4 w-4 text-purple-600 ml-2" />
                      تراخيص التوزيع الحصري
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">هل تريد أن تصبح شريكاً؟</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            نحن دائماً نبحث عن شركاء جدد لتوسيع شبكتنا العالمية وتقديم أفضل الخدمات لعملائنا
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/contact">
                تقدم للشراكة
                <ArrowRight className="mr-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/products">
                استكشف منتجاتنا
                <ArrowRight className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Partners;
