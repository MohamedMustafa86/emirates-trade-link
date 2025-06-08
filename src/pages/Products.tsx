
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, Truck, Shield, Clock } from "lucide-react";

const Products = () => {
  const productCategories = [
    {
      title: "مواد البناء",
      description: "أحدث مواد البناء والإنشاء من أفضل المصانع العالمية",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5",
      link: "/products/building-materials",
      features: ["خرسانة عالية الجودة", "حديد التسليح", "مواد العزل الحراري", "الطوب والبلاط"]
    },
    {
      title: "مواد التعبئة والتغليف",
      description: "حلول تعبئة وتغليف متطورة لجميع الصناعات",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
      link: "/products/packaging-supplies",
      features: ["أكياس بلاستيكية", "صناديق كرتونية", "مواد حماية", "علب معدنية"]
    },
    {
      title: "المواد الخام البلاستيكية",
      description: "مواد خام بلاستيكية عالية النقاء للصناعات المختلفة",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3",
      link: "/products/plastic-raw-materials",
      features: ["بولي إيثيلين", "بولي بروبيلين", "PVC", "البلاستيك المعاد تدويره"]
    },
    {
      title: "السلع الاستهلاكية",
      description: "منتجات استهلاكية متنوعة لتلبية احتياجات السوق المحلي",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
      link: "/products/consumer-goods",
      features: ["الإلكترونيات", "المنتجات المنزلية", "الألعاب", "مستحضرات التجميل"]
    },
    {
      title: "المعدات والآلات",
      description: "معدات وآلات صناعية حديثة لمختلف القطاعات",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      link: "/products/machinery-equipment",
      features: ["آلات التصنيع", "معدات البناء", "أنظمة الأتمتة", "قطع الغيار"]
    }
  ];

  const advantages = [
    {
      icon: <Package className="h-8 w-8 text-green-600" />,
      title: "جودة مضمونة",
      description: "منتجات من مصانع معتمدة وموثوقة عالمياً"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "شهادات دولية",
      description: "جميع منتجاتنا تحمل شهادات الجودة المطلوبة"
    },
    {
      icon: <Truck className="h-8 w-8 text-green-600" />,
      title: "توصيل سريع",
      description: "خدمات لوجستية متطورة وتوصيل في الوقت المحدد"
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      title: "دعم على مدار الساعة",
      description: "فريق دعم فني متخصص متاح دائماً لخدمتكم"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg mb-12">
          <h1 className="text-4xl font-bold mb-4">منتجاتنا</h1>
          <p className="text-xl max-w-3xl mx-auto">
            مجموعة شاملة من المنتجات عالية الجودة من أفضل المصانع العالمية
          </p>
        </section>

        {/* Product Categories */}
        <section className="mb-12">
          <div className="grid gap-8">
            {productCategories.map((category, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className={`order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                      <img 
                        src={category.image} 
                        alt={category.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className={`p-8 order-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">{category.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-800 mb-3">المنتجات الرئيسية:</h4>
                        <ul className="grid grid-cols-2 gap-2">
                          {category.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <div className="w-2 h-2 bg-green-600 rounded-full ml-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button asChild className="bg-green-600 hover:bg-green-700">
                        <Link to={category.link}>
                          عرض التفاصيل
                          <ArrowLeft className="mr-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Advantages */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">لماذا تختار منتجاتنا؟</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {advantages.map((advantage, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      {advantage.icon}
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">{advantage.title}</h4>
                    <p className="text-sm text-gray-600">{advantage.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">هل تبحث عن منتج معين؟</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            فريقنا المتخصص جاهز لمساعدتك في العثور على المنتجات المناسبة لاحتياجاتك
          </p>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <Link to="/contact">
              تواصل معنا الآن
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Link>
          </Button>
        </section>
      </main>
    </div>
  );
};

export default Products;
