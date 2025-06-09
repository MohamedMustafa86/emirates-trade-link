

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Users, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg mb-12">
          <h1 className="text-4xl font-bold mb-4">من نحن</h1>
          <p className="text-xl max-w-3xl mx-auto">
            UAE HUB - شريكك الموثوق في التجارة والتوريد على مستوى الإمارات والمنطقة
          </p>
        </section>

        {/* Company Background */}
        <section className="mb-12">
          <Card className="overflow-hidden">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">خلفية الشركة</h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    تأسست UAE HUB لتكون الجسر الرابط بين المنتجات العالمية والأسواق الإماراتية. نحن نتخصص في التجارة وتوريد المنتجات من أفضل المصانع العالمية إلى دولة الإمارات العربية المتحدة ودول مجلس التعاون الخليجي.
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    بفضل خبرتنا الواسعة في مجال التجارة الدولية وشبكة علاقاتنا القوية مع المصنعين الموثوقين حول العالم، نضمن توفير منتجات عالية الجودة بأسعار تنافسية وخدمات لوجستية متميزة.
                  </p>
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <Link to="/contact">
                      تواصل معنا
                      <ArrowRight className="mr-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" 
                    alt="UAE Business" 
                    className="w-full h-80 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Vision & Mission */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-green-200">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Eye className="h-8 w-8 text-green-600 ml-3" />
                  <h3 className="text-2xl font-bold text-gray-800">رؤيتنا</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  أن نكون المنصة الرائدة في منطقة الشرق الأوسط لربط المنتجات العالمية بالأسواق المحلية، مع التركيز على الجودة والموثوقية والخدمة المتميزة.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-green-600 ml-3" />
                  <h3 className="text-2xl font-bold text-gray-800">مهمتنا</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  تسهيل التجارة بين المصنعين العالميين والعملاء في دولة الإمارات ودول الخليج من خلال توفير حلول توريد شاملة ومتكاملة تضمن أعلى معايير الجودة والكفاءة.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Leadership Profile */}
        <section className="mb-12">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">القيادة</h2>
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="text-center">
                    <img 
                      src="/lovable-uploads/f4d19333-8a05-44bc-bcfa-76cc5bae4859.png" 
                      alt="Mohamed Mustafa" 
                      className="w-48 h-48 object-cover rounded-full mx-auto mb-4 shadow-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">محمد مصطفى</h3>
                    <p className="text-green-600 font-semibold mb-4">المؤسس والمدير التنفيذي</p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      يتمتع محمد مصطفى بخبرة واسعة في مجال التجارة الدولية والتوريد، حيث قاد العديد من المشاريع التجارية الناجحة في منطقة الشرق الأوسط. بفضل رؤيته الاستراتيجية وفهمه العميق للأسواق الإماراتية والخليجية، تمكن من بناء شبكة قوية من الشراكات مع أفضل المصنعين حول العالم.
                    </p>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-green-600 ml-2" />
                      <span className="text-gray-600">أكثر من 15 عاماً من الخبرة في التجارة الدولية</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Regional Focus */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">التركيز الإقليمي والعالمي</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">الأسواق المحلية</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full ml-3"></div>
                      دولة الإمارات العربية المتحدة
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full ml-3"></div>
                      المملكة العربية السعودية
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full ml-3"></div>
                      سلطنة عمان
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full ml-3"></div>
                      دولة الكويت
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full ml-3"></div>
                      دولة قطر
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">شبكة الموردين العالمية</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full ml-3"></div>
                      جمهورية الصين الشعبية
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full ml-3"></div>
                      جمهورية الهند
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full ml-3"></div>
                      جمهورية تركيا
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full ml-3"></div>
                      جمهورية ألمانيا الاتحادية
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full ml-3"></div>
                      الولايات المتحدة الأمريكية
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Awards & Certifications */}
        <section className="mb-12">
          <Card>
            <CardContent className="p-8">
              <div className="text-center">
                <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-6">الشهادات والتراخيص</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">ترخيص الاستيراد والتصدير</h4>
                    <p className="text-sm text-gray-600">معتمد من الجهات الحكومية الإماراتية</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">شهادة الجودة ISO</h4>
                    <p className="text-sm text-gray-600">معايير الجودة العالمية</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">عضوية غرفة التجارة</h4>
                    <p className="text-sm text-gray-600">عضو فعال في غرفة تجارة الإمارات</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default About;

