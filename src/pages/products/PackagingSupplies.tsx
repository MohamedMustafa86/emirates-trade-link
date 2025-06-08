
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { ArrowRight, Package, MapPin, Clock, Shield, Recycle } from "lucide-react";

const PackagingSupplies = () => {
  const products = [
    {
      name: "أكياس بلاستيكية عالية الجودة",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
      specs: ["مقاوم للتمزق", "شفاف وملون", "أحجام متنوعة"],
      origin: "ماليزيا",
      moq: "10,000 قطعة",
      leadTime: "15-20 يوم",
      certifications: ["FDA", "ISO 9001", "BRC"]
    },
    {
      name: "صناديق كرتونية مموجة",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13",
      specs: ["مقاوم للرطوبة", "قوة تحمل عالية", "قابل للطباعة"],
      origin: "الهند",
      moq: "5,000 قطعة",
      leadTime: "12-18 يوم",
      certifications: ["FSC", "ISO 9001", "FEFCO"]
    },
    {
      name: "مواد الحماية والتوسيد",
      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55",
      specs: ["فقاعات هوائية", "رغوة واقية", "مواد صديقة للبيئة"],
      origin: "تايلاند",
      moq: "2,000 متر",
      leadTime: "10-15 يوم",
      certifications: ["ISO 14001", "Green Packaging"]
    },
    {
      name: "علب معدنية للأغذية",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf",
      specs: ["مقاوم للصدأ", "آمن للأغذية", "إغلاق محكم"],
      origin: "الصين",
      moq: "20,000 قطعة",
      leadTime: "25-30 يوم",
      certifications: ["FDA", "HACCP", "BPA Free"]
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
          <span className="text-gray-800">مواد التعبئة والتغليف</span>
        </div>

        {/* Hero Section */}
        <section className="text-center py-12 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg mb-12">
          <h1 className="text-4xl font-bold mb-4">مواد التعبئة والتغليف</h1>
          <p className="text-xl max-w-3xl mx-auto">
            حلول تعبئة وتغليف متطورة وصديقة للبيئة لجميع الصناعات والاحتياجات
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
                              <Package className="h-3 w-3 text-purple-600 ml-2" />
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

                    <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                      طلب عرض سعر
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sustainability Section */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Recycle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">التزامنا بالاستدامة</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  نحرص على توفير مواد تعبئة وتغليف صديقة للبيئة وقابلة للتدوير لحماية البيئة والمحافظة على الموارد الطبيعية
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Recycle className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">مواد قابلة للتدوير</h4>
                  <p className="text-sm text-gray-600">90% من منتجاتنا قابلة للتدوير الكامل</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">مواد آمنة</h4>
                  <p className="text-sm text-gray-600">خالية من المواد الضارة والكيماويات السامة</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">تصميم ذكي</h4>
                  <p className="text-sm text-gray-600">تقليل النفايات وتحسين كفاءة التعبئة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">تحتاج إلى حلول تعبئة مخصصة؟</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            فريقنا المتخصص يمكنه تصميم حلول تعبئة وتغليف مخصصة لتناسب احتياجاتكم الخاصة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link to="/contact">
                استشارة مجانية
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

export default PackagingSupplies;
