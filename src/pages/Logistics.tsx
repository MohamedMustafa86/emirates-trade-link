
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Package, MapPin, Clock, Shield, FileText, Plane, Ship } from "lucide-react";

const Logistics = () => {
  const services = [
    {
      title: "الشحن الجوي السريع",
      icon: <Plane className="h-12 w-12 text-blue-600" />,
      description: "خدمات شحن جوي سريعة للطلبات العاجلة",
      features: ["تسليم في 3-5 أيام", "تتبع مباشر", "تأمين شامل", "خدمة 24/7"],
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05"
    },
    {
      title: "الشحن البحري الاقتصادي",
      icon: <Ship className="h-12 w-12 text-green-600" />,
      description: "حلول شحن بحري اقتصادية للأحمال الكبيرة",
      features: ["أسعار تنافسية", "حاويات كاملة وجزئية", "تخليص جمركي", "تخزين مؤقت"],
      image: "https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff"
    },
    {
      title: "التوزيع المحلي",
      icon: <Truck className="h-12 w-12 text-orange-600" />,
      description: "شبكة توزيع محلية تغطي جميع إمارات الدولة",
      features: ["تسليم يوم العمل التالي", "مخازن في جميع الإمارات", "أسطول متطور", "تتبع الشحنات"],
      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55"
    }
  ];

  const warehouses = [
    {
      city: "دبي",
      area: "جبل علي",
      size: "50,000 متر مربع",
      specialization: "المعدات الثقيلة والآلات",
      image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55"
    },
    {
      city: "أبوظبي",
      area: "المصفح الصناعية",
      size: "30,000 متر مربع",
      specialization: "المواد الخام والكيماويات",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
    },
    {
      city: "الشارقة",
      area: "المنطقة الحرة",
      size: "25,000 متر مربع",
      specialization: "السلع الاستهلاكية والإلكترونيات",
      image: "https://images.unsplash.com/photo-1553051296-bf5c8e4bb19c"
    }
  ];

  const coverage = [
    { country: "الإمارات", cities: ["دبي", "أبوظبي", "الشارقة", "عجمان", "أم القيوين", "رأس الخيمة", "الفجيرة"] },
    { country: "السعودية", cities: ["الرياض", "جدة", "الدمام", "الخبر", "مكة المكرمة"] },
    { country: "عُمان", cities: ["مسقط", "صلالة", "نزوى", "صحار"] },
    { country: "الكويت", cities: ["مدينة الكويت", "الأحمدي", "حولي"] },
    { country: "قطر", cities: ["الدوحة", "الريان", "الوكرة"] },
    { country: "البحرين", cities: ["المنامة", "المحرق", "الرفاع"] }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 bg-gradient-to-r from-green-600 to-teal-500 text-white rounded-lg mb-12">
          <h1 className="text-4xl font-bold mb-4">خدمات التوريد واللوجستيات</h1>
          <p className="text-xl max-w-3xl mx-auto">
            حلول لوجستية متكاملة وخدمات توريد احترافية لضمان وصول منتجاتكم في الوقت المحدد
          </p>
        </section>

        {/* Logistics Services */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">خدماتنا اللوجستية</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {service.icon}
                      <h3 className="text-xl font-bold text-gray-800 mr-3">{service.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-600 rounded-full ml-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Warehouse Facilities */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">مرافق التخزين</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {warehouses.map((warehouse, index) => (
                  <Card key={index} className="bg-white shadow-md">
                    <CardContent className="p-0">
                      <img 
                        src={warehouse.image} 
                        alt={`مخزن ${warehouse.city}`}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{warehouse.city}</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-blue-600 ml-2" />
                            {warehouse.area}
                          </div>
                          <div className="flex items-center">
                            <Package className="h-4 w-4 text-green-600 ml-2" />
                            {warehouse.size}
                          </div>
                          <div className="mt-2">
                            <strong>التخصص:</strong> {warehouse.specialization}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Regional Coverage */}
        <section className="mb-12">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">التغطية الإقليمية</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coverage.map((region, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <MapPin className="h-5 w-5 text-green-600 ml-2" />
                      {region.country}
                    </h4>
                    <ul className="space-y-2">
                      {region.cities.map((city, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full ml-2"></div>
                          {city}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Documentation & Compliance */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <FileText className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">الوثائق والامتثال</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  نضمن امتثال جميع شحناتنا للقوانين والأنظمة المحلية والدولية مع توفير الوثائق المطلوبة
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">شهادات المنشأ</h4>
                  <p className="text-sm text-gray-600">وثائق معتمدة لجميع المنتجات</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">التخليص الجمركي</h4>
                  <p className="text-sm text-gray-600">خدمات تخليص شاملة وسريعة</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">شهادات الجودة</h4>
                  <p className="text-sm text-gray-600">فحص وتدقيق شامل للمنتجات</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">تتبع الشحنات</h4>
                  <p className="text-sm text-gray-600">مراقبة مباشرة ومستمرة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">تحتاج إلى خدمات لوجستية مخصصة؟</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            فريقنا اللوجستي المتخصص جاهز لتصميم حلول مخصصة تناسب احتياجاتكم الخاصة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link to="/contact">
                استشارة لوجستية مجانية
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

export default Logistics;
