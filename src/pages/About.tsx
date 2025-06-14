
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
            DUBAIMERX.COM - بوابتك لتسويق المنتجات الإماراتية والخليجية إلى الأسواق العالمية والإقليمية
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
                    تأسست DUBAIMERX.COM لتكون المنصة الرائدة في تسويق وعرض المنتجات الإماراتية والخليجية عالمياً. نحن نتخصص في ربط المنتجين والمصنعين في دولة الإمارات العربية المتحدة ودول مجلس التعاون الخليجي بالأسواق العالمية والإفريقية وأسواق الشرق الأوسط.
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    مهمتنا هي الانطلاق بالمنتجات المحلية عالية الجودة من المنطقة الخليجية وتعريف العالم بتميز وإبداع الصناعات الوطنية، مع توفير حلول تسويقية متكاملة تضمن وصول منتجاتنا إلى أوسع شريحة من العملاء الدوليين.
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
                  أن نكون المنصة الرقمية الرائدة عالمياً في تسويق وتصدير المنتجات الإماراتية والخليجية، وأن نصبح الجسر الذي يربط إبداع وتميز الصناعات الوطنية بالأسواق العالمية، مع التركيز على الأسواق الإفريقية الناشئة وأسواق الشرق الأوسط الواعدة.
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
                  تمكين المنتجين والمصنعين في دولة الإمارات ودول الخليج من الوصول إلى الأسواق العالمية من خلال منصة تسويقية متطورة تقدم حلولاً شاملة للتصدير والتوزيع، مع التركيز على بناء جسور تجارية قوية مع القارة الإفريقية والأسواق الإقليمية.
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
                      يتمتع محمد مصطفى بخبرة واسعة في مجال التسويق الدولي والتصدير، حيث قاد العديد من المبادرات الناجحة لتسويق المنتجات الخليجية عالمياً. بفضل رؤيته الاستراتيجية وفهمه العميق للأسواق الإفريقية والشرق أوسطية، تمكن من بناء شبكة توزيع قوية تمتد عبر القارات.
                    </p>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-green-600 ml-2" />
                      <span className="text-gray-600">أكثر من 15 عاماً من الخبرة في التسويق الدولي والتصدير</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Target Markets */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">أسواقنا المستهدفة</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">دول مجلس التعاون الخليجي</h4>
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
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full ml-3"></div>
                      مملكة البحرين
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">الأسواق الإفريقية</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full ml-3"></div>
                      جمهورية مصر العربية
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full ml-3"></div>
                      جمهورية جنوب إفريقيا
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full ml-3"></div>
                      جمهورية نيجيريا الاتحادية
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full ml-3"></div>
                      جمهورية كينيا
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full ml-3"></div>
                      المملكة المغربية
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">أسواق الشرق الأوسط</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full ml-3"></div>
                      الجمهورية اللبنانية
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full ml-3"></div>
                      الجمهورية العراقية
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full ml-3"></div>
                      الجمهورية الإسلامية الإيرانية
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full ml-3"></div>
                      جمهورية تركيا
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full ml-3"></div>
                      المملكة الأردنية الهاشمية
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
                    <h4 className="font-semibold text-gray-800 mb-2">ترخيص التصدير والاستيراد</h4>
                    <p className="text-sm text-gray-600">معتمد من وزارة الاقتصاد الإماراتية</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">شهادة الجودة ISO</h4>
                    <p className="text-sm text-gray-600">معايير الجودة العالمية للتصدير</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">عضوية مجلس الأعمال الإماراتي الإفريقي</h4>
                    <p className="text-sm text-gray-600">عضو فعال في تعزيز التجارة مع إفريقيا</p>
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
