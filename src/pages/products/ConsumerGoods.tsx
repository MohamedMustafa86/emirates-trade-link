
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { ArrowRight, Package, MapPin, Clock, Shield, Star } from "lucide-react";

const ConsumerGoods = () => {
  const products = [
    {
      name: "الأجهزة الإلكترونية الذكية",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      specs: ["تقنية حديثة", "ضمان شامل", "كفاءة في الطاقة"],
      origin: "كوريا الجنوبية",
      moq: "100 قطعة",
      leadTime: "25-30 يوم",
      certifications: ["CE", "FCC", "RoHS"]
    },
    {
      name: "المنتجات المنزلية الذكية",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
      specs: ["تصميم عصري", "جودة عالية", "سهولة الاستخدام"],
      origin: "الصين",
      moq: "500 قطعة",
      leadTime: "20-25 يوم",
      certifications: ["ISO 9001", "CE", "CCC"]
    },
    {
      name: "ألعاب تعليمية للأطفال",
      image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7",
      specs: ["آمنة للأطفال", "مواد غير سامة", "تطوير المهارات"],
      origin: "ألمانيا",
      moq: "200 قطعة",
      leadTime: "30-35 يوم",
      certifications: ["CE", "ASTM", "EN71"]
    },
    {
      name: "مستحضرات التجميل الطبيعية",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
      specs: ["مكونات طبيعية", "خالية من البارابين", "صديقة للبيئة"],
      origin: "فرنسا",
      moq: "1,000 قطعة",
      leadTime: "15-20 يوم",
      certifications: ["ISO 22716", "COSMOS", "FDA"]
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
          <span className="text-gray-800">السلع الاستهلاكية</span>
        </div>

        {/* Hero Section */}
        <section className="text-center py-12 bg-gradient-to-r from-pink-600 to-rose-500 text-white rounded-lg mb-12">
          <h1 className="text-4xl font-bold mb-4">السلع الاستهلاكية</h1>
          <p className="text-xl max-w-3xl mx-auto">
            مجموعة متنوعة من المنتجات الاستهلاكية عالية الجودة لتلبية احتياجات السوق المحلي والإقليمي
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
                        <h4 className="font-semibold text-gray-700 mb-2">المميزات:</h4>
                        <ul className="space-y-1">
                          {product.specs.map((spec, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <Star className="h-3 w-3 text-pink-600 ml-2" />
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

                    <Button className="w-full mt-6 bg-pink-600 hover:bg-pink-700">
                      طلب عرض سعر
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Market Trends Section */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-pink-50 to-rose-50">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">اتجاهات السوق الحديثة</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-pink-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">المنتجات الذكية</h4>
                  <p className="text-sm text-gray-600">تقنيات متطورة ومتصلة بالإنترنت</p>
                </div>
                <div className="text-center">
                  <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-pink-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">الاستدامة</h4>
                  <p className="text-sm text-gray-600">منتجات صديقة للبيئة ومستدامة</p>
                </div>
                <div className="text-center">
                  <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-pink-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">التخصيص</h4>
                  <p className="text-sm text-gray-600">منتجات قابلة للتخصيص حسب الحاجة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">تبحث عن منتجات جديدة؟</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            نحن دائماً نبحث عن أحدث المنتجات في السوق العالمي لنوفرها لعملائنا
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-pink-600 hover:bg-pink-700">
              <Link to="/contact">
                استفسر عن منتج معين
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

export default ConsumerGoods;
