
import { MapPin, CheckCircle, Shield, Truck, Users, Package } from "lucide-react";

const PromotionalSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-right">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              احصل على منتجاتك من الإمارات والسعودية
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              بكل سهولة وأمان مع خدمات الشحن والتوصيل المتطورة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                <MapPin className="h-6 w-6 text-yellow-300" />
                <span className="font-medium">الإمارات العربية المتحدة</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                <MapPin className="h-6 w-6 text-yellow-300" />
                <span className="font-medium">المملكة العربية السعودية</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-yellow-300" />
                مميزاتنا
              </h3>
              <ul className="space-y-3 text-lg">
                <li className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-yellow-300" />
                  معاملات آمنة ومضمونة
                </li>
                <li className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-yellow-300" />
                  شحن سريع وموثوق
                </li>
                <li className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-yellow-300" />
                  دعم عملاء على مدار الساعة
                </li>
                <li className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-yellow-300" />
                  منتجات عالية الجودة
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalSection;
