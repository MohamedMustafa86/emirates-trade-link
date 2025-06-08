
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { ArrowRight, Package, MapPin, Clock, Shield, Zap } from "lucide-react";

const PlasticRawMaterials = () => {
  const products = [
    {
      name: "بولي إيثيلين عالي الكثافة (HDPE)",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3",
      specs: ["نقاء عالي 99.5%", "مقاوم للكيماويات", "سهل التشكيل"],
      origin: "كوريا الجنوبية",
      moq: "25 طن",
      leadTime: "20-25 يوم",
      certifications: ["ISO 9001", "REACH", "FDA"]
    },
    {
      name: "بولي بروبيلين (PP)",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
      specs: ["مقاوم للحرارة", "شفافية عالية", "مرونة ممتازة"],
      origin: "اليابان",
      moq: "20 طن",
      leadTime: "18-22 يوم",
      certifications: ["ISO 9001", "JIS", "ASTM"]
    },
    {
      name: "كلوريد البولي فينيل (PVC)",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      specs: ["مثبطات حريق", "مقاوم للطقس", "سهل الصبغ"],
      origin: "تايوان",
      moq: "15 طن",
      leadTime: "15-20 يوم",
      certifications: ["ISO 9001", "CPSIA", "RoHS"]
    },
    {
      name: "البلاستيك المعاد تدويره",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
      specs: ["صديق للبيئة", "جودة عالية", "أسعار تنافسية"],
      origin: "هولندا",
      moq: "10 طن",
      leadTime: "12-18 يوم",
      certifications: ["ISO 14001", "GRS", "ISCC"]
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
          <span className="text-gray-800">المواد الخام البلاستيكية</span>
        </div>

        {/* Hero Section */}
        <section className="text-center py-12 bg-gradient-to-r from-teal-600 to-cyan-500 text-white rounded-lg mb-12">
          <h1 className="text-4xl font-bold mb-4">المواد الخام البلاستيكية</h1>
          <p className="text-xl max-w-3xl mx-auto">
            مواد خام بلاستيكية عالية النقاء والجودة من أفضل المصانع العالمية للصناعات المختلفة
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
                              <Zap className="h-3 w-3 text-teal-600 ml-2" />
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

                    <Button className="w-full mt-6 bg-teal-600 hover:bg-teal-700">
                      طلب عرض سعر
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technical Support Section */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-teal-50 to-cyan-50">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">الدعم الفني المتخصص</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-teal-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">اختبارات الجودة</h4>
                  <p className="text-sm text-gray-600">فحص شامل لجميع المواد قبل الشحن</p>
                </div>
                <div className="text-center">
                  <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-teal-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">استشارات فنية</h4>
                  <p className="text-sm text-gray-600">مساعدة في اختيار المادة المناسبة</p>
                </div>
                <div className="text-center">
                  <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-teal-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">عينات مجانية</h4>
                  <p className="text-sm text-gray-600">عينات للاختبار قبل الطلب الكبير</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">تحتاج إلى مواد خام مخصصة؟</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            يمكننا توفير مواد خام بلاستيكية بمواصفات خاصة وفقاً لمتطلبات صناعتكم
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-700">
              <Link to="/contact">
                استشارة فنية مجانية
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

export default PlasticRawMaterials;
