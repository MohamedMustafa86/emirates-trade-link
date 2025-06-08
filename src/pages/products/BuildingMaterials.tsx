
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { ArrowRight, Package, MapPin, Clock, Shield } from "lucide-react";

const BuildingMaterials = () => {
  const products = [
    {
      name: "خرسانة عالية المقاومة",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5",
      specs: ["قوة ضغط: 40-60 MPa", "مقاومة للطقس", "سرعة تصلب عالية"],
      origin: "ألمانيا",
      moq: "100 طن",
      leadTime: "15-20 يوم",
      certifications: ["CE", "ISO 9001", "ASTM"]
    },
    {
      name: "حديد التسليح المقاوم للصدأ",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
      specs: ["درجة 60", "مقاوم للتآكل", "مطابق للمواصفات الدولية"],
      origin: "تركيا",
      moq: "50 طن",
      leadTime: "10-15 يوم",
      certifications: ["ISO 9001", "ASTM A615", "BS 4449"]
    },
    {
      name: "مواد العزل الحراري",
      image: "https://images.unsplash.com/photo-1558618066-fcd25c85cd64",
      specs: ["معامل توصيل حراري منخفض", "مقاوم للحريق", "صديق للبيئة"],
      origin: "الصين",
      moq: "1000 متر مربع",
      leadTime: "20-25 يوم",
      certifications: ["CE", "GREENGUARD", "ASTM E84"]
    },
    {
      name: "بلاط السيراميك الفاخر",
      image: "https://images.unsplash.com/photo-1586864387789-628af9feed72",
      specs: ["مقاوم للانزلاق", "سهل التنظيف", "تصميمات متنوعة"],
      origin: "إيطاليا",
      moq: "500 متر مربع",
      leadTime: "25-30 يوم",
      certifications: ["CE", "ISO 13006", "ANSI A137.1"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-green-600">الرئيسية</Link>
          <span className="mx-2">›</span>
          <Link to="/products" className="hover:text-green-600">المنتجات</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800">مواد البناء</span>
        </div>

        {/* Hero Section */}
        <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-lg mb-12">
          <h1 className="text-4xl font-bold mb-4">مواد البناء</h1>
          <p className="text-xl max-w-3xl mx-auto">
            أحدث مواد البناء والإنشاء من أفضل المصانع العالمية لضمان جودة وقوة مشاريعكم
          </p>
        </section>

        {/* Products Grid */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{product.name}</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">المواصفات:</h4>
                        <ul className="space-y-1">
                          {product.specs.map((spec, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <Package className="h-3 w-3 text-green-600 ml-2" />
                              {spec}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-blue-600 ml-2" />
                          <span><strong>المنشأ:</strong> {product.origin}</span>
                        </div>
                        <div className="flex items-center">
                          <Package className="h-4 w-4 text-green-600 ml-2" />
                          <span><strong>الحد الأدنى:</strong> {product.moq}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-orange-600 ml-2" />
                          <span><strong>وقت التسليم:</strong> {product.leadTime}</span>
                        </div>
                        <div className="flex items-center">
                          <Shield className="h-4 w-4 text-purple-600 ml-2" />
                          <span><strong>الشهادات:</strong> {product.certifications.join(", ")}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                      طلب عرض سعر
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">مميزات مواد البناء لدينا</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">جودة عالمية</h4>
                  <p className="text-sm text-gray-600">مواد مطابقة للمعايير الدولية والمحلية</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">تسليم سريع</h4>
                  <p className="text-sm text-gray-600">شحن وتوصيل في الأوقات المحددة</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">تعبئة آمنة</h4>
                  <p className="text-sm text-gray-600">تعبئة وتغليف محترف لضمان وصول آمن</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">هل تحتاج إلى استشارة فنية؟</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            فريقنا الهندسي جاهز لتقديم المشورة الفنية واختيار أفضل المواد المناسبة لمشروعكم
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/contact">
                تواصل مع الفريق الفني
                <ArrowRight className="mr-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/products">
                عودة إلى المنتجات
                <ArrowRight className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BuildingMaterials;
