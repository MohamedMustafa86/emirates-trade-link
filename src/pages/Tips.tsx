import Navigation from "@/components/Navigation";
import FixedFooter from "@/components/FixedFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { 
  Lightbulb, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  Star,
  Users,
  Target,
  Award,
  BookOpen,
  MessageCircle
} from "lucide-react";

const Tips = () => {
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === "العربية";

  const tips = [
    {
      id: 1,
      title: isRTL ? "اختيار الموردين الموثوقين" : "Choosing Reliable Suppliers",
      description: isRTL ? 
        "تأكد من التحقق من سجل الموردين وتقييماتهم قبل الشراء. ابحث عن الشهادات والتراخيص المناسبة." :
        "Always verify supplier credentials and ratings before purchasing. Look for proper certifications and licenses.",
      icon: <Shield className="h-6 w-6" />,
      category: isRTL ? "أمان" : "Security",
      readTime: isRTL ? "3 دقائق" : "3 min read"
    },
    {
      id: 2,
      title: isRTL ? "التفاوض على الأسعار بذكاء" : "Smart Price Negotiation",
      description: isRTL ? 
        "اطلب عروض أسعار من عدة موردين وقارن بينها. لا تتردد في التفاوض، خاصة للطلبات الكبيرة." :
        "Request quotes from multiple suppliers and compare. Don't hesitate to negotiate, especially for bulk orders.",
      icon: <TrendingUp className="h-6 w-6" />,
      category: isRTL ? "تجارة" : "Business",
      readTime: isRTL ? "5 دقائق" : "5 min read"
    },
    {
      id: 3,
      title: isRTL ? "ضمان جودة المنتجات" : "Ensuring Product Quality",
      description: isRTL ? 
        "اطلب عينات قبل الطلب الكبير. تأكد من مطابقة المنتجات للمواصفات المطلوبة والمعايير الدولية." :
        "Request samples before bulk orders. Ensure products meet required specifications and international standards.",
      icon: <CheckCircle className="h-6 w-6" />,
      category: isRTL ? "جودة" : "Quality",
      readTime: isRTL ? "4 دقائق" : "4 min read"
    },
    {
      id: 4,
      title: isRTL ? "بناء علاقات طويلة المدى" : "Building Long-term Relationships",
      description: isRTL ? 
        "استثمر في بناء علاقات قوية مع الموردين. التواصل المستمر والشفافية يؤديان إلى شراكات ناجحة." :
        "Invest in building strong supplier relationships. Continuous communication and transparency lead to successful partnerships.",
      icon: <Users className="h-6 w-6" />,
      category: isRTL ? "علاقات" : "Relationships",
      readTime: isRTL ? "6 دقائق" : "6 min read"
    },
    {
      id: 5,
      title: isRTL ? "إدارة المخزون بكفاءة" : "Efficient Inventory Management",
      description: isRTL ? 
        "خطط لاحتياجاتك مسبقاً وحافظ على توازن في المخزون. تجنب التخزين المفرط أو النقص في المواد." :
        "Plan your needs in advance and maintain inventory balance. Avoid overstocking or material shortages.",
      icon: <Target className="h-6 w-6" />,
      category: isRTL ? "إدارة" : "Management",
      readTime: isRTL ? "7 دقائق" : "7 min read"
    },
    {
      id: 6,
      title: isRTL ? "الاستفادة من التكنولوجيا" : "Leveraging Technology",
      description: isRTL ? 
        "استخدم منصات B2B الرقمية لتوسيع شبكة الموردين وتسهيل عمليات الشراء والتواصل." :
        "Use digital B2B platforms to expand your supplier network and streamline purchasing and communication processes.",
      icon: <Award className="h-6 w-6" />,
      category: isRTL ? "تقنية" : "Technology",
      readTime: isRTL ? "4 دقائق" : "4 min read"
    }
  ];

  const categories = [
    { name: isRTL ? "الكل" : "All", count: tips.length },
    { name: isRTL ? "أمان" : "Security", count: 1 },
    { name: isRTL ? "تجارة" : "Business", count: 1 },
    { name: isRTL ? "جودة" : "Quality", count: 1 },
    { name: isRTL ? "علاقات" : "Relationships", count: 1 },
    { name: isRTL ? "إدارة" : "Management", count: 1 },
    { name: isRTL ? "تقنية" : "Technology", count: 1 }
  ];

  return (
    <div className={`min-h-screen bg-gray-50 pb-20 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-lg mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full">
              <Lightbulb className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            {isRTL ? "نصائح وإرشادات للأعمال" : "Business Tips & Insights"}
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            {isRTL ? 
              "اكتشف أفضل الممارسات والنصائح الذهبية لتحسين أعمالك وتحقيق النجاح في التجارة الإلكترونية" :
              "Discover best practices and golden tips to improve your business and achieve success in e-commerce"
            }
          </p>
        </section>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {isRTL ? "التصنيفات" : "Categories"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <div 
                    key={category.name}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <span className="text-sm font-medium">{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Tips Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {tips.map((tip) => (
                <Card key={tip.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-200 transition-colors">
                          {tip.icon}
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-2">
                            {tip.category}
                          </Badge>
                          <CardTitle className="text-lg leading-tight">
                            {tip.title}
                          </CardTitle>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {tip.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{isRTL ? "مفيد" : "Helpful"}</span>
                      </div>
                      <span>{tip.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <Card className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-8 text-center">
                <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">
                  {isRTL ? "هل تحتاج إلى مساعدة إضافية؟" : "Need Additional Help?"}
                </h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  {isRTL ? 
                    "فريق الخبراء لدينا جاهز لمساعدتك في تحسين استراتيجيات الأعمال وتحقيق أهدافك التجارية" :
                    "Our expert team is ready to help you improve your business strategies and achieve your commercial goals"
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                    {isRTL ? "تواصل مع الخبراء" : "Contact Experts"}
                  </button>
                  <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors">
                    {isRTL ? "اطلب استشارة مجانية" : "Request Free Consultation"}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <FixedFooter currentLanguage={currentLanguage} />
    </div>
  );
};

export default Tips;