import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Lightbulb, Search, Star, TrendingUp, Shield, DollarSign, Package, Users } from "lucide-react";
import { Link } from "react-router-dom";
import FixedFooter from "@/components/FixedFooter";
import { useLanguage } from "@/hooks/useLanguage";

interface Tip {
  id: string;
  title: string;
  content: string;
  category: string;
  icon: any;
  color: string;
  rating: number;
  views: number;
}

const Tips = () => {
  const { currentLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const tips: Tip[] = [
    {
      id: '1',
      title: 'كيفية التفاوض على الأسعار مع الموردين',
      content: 'نصائح فعالة للحصول على أفضل الأسعار عند التعامل مع الموردين الدوليين وتقنيات التفاوض الناجحة.',
      category: 'تفاوض',
      icon: DollarSign,
      color: 'bg-green-100 text-green-800',
      rating: 4.8,
      views: 1250
    },
    {
      id: '2',
      title: 'معايير اختيار المورد الموثوق',
      content: 'دليل شامل لتقييم الموردين والتأكد من مصداقيتهم وجودة منتجاتهم قبل إتمام الصفقات.',
      category: 'جودة',
      icon: Shield,
      color: 'bg-blue-100 text-blue-800',
      rating: 4.9,
      views: 980
    },
    {
      id: '3',
      title: 'أفضل طرق الشحن والاستيراد',
      content: 'نصائح حول اختيار طرق الشحن المناسبة وتوفير تكاليف الاستيراد والتعامل مع الجمارك.',
      category: 'شحن',
      icon: Package,
      color: 'bg-purple-100 text-purple-800',
      rating: 4.7,
      views: 1100
    },
    {
      id: '4',
      title: 'بناء علاقات طويلة المدى مع الموردين',
      content: 'استراتيجيات فعالة لبناء شراكات مربحة ومستدامة مع الموردين وتطوير الأعمال التجارية.',
      category: 'علاقات',
      icon: Users,
      color: 'bg-orange-100 text-orange-800',
      rating: 4.6,
      views: 850
    },
    {
      id: '5',
      title: 'تتبع اتجاهات السوق والطلب',
      content: 'كيفية مراقبة اتجاهات السوق وتحليل الطلب لاتخاذ قرارات شراء ذكية ومربحة.',
      category: 'تحليل',
      icon: TrendingUp,
      color: 'bg-red-100 text-red-800',
      rating: 4.5,
      views: 720
    },
    {
      id: '6',
      title: 'ضمان جودة المنتجات المستوردة',
      content: 'خطوات عملية لفحص جودة المنتجات والتأكد من مطابقتها للمواصفات المطلوبة.',
      category: 'جودة',
      icon: Star,
      color: 'bg-yellow-100 text-yellow-800',
      rating: 4.8,
      views: 950
    }
  ];

  const categories = ['الكل', 'تفاوض', 'جودة', 'شحن', 'علاقات', 'تحليل'];

  const filteredTips = tips.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || tip.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between border-b">
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-5 w-5 mr-2" />
          العودة للرئيسية
        </Link>
        <h1 className="text-lg font-bold flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          نصائح التجارة
        </h1>
        <div className="w-20"></div>
      </div>

      <div className="p-4 space-y-6">
        {/* Hero Section */}
        <Card className="bg-gradient-to-l from-blue-500 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Lightbulb className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-1">نصائح وإرشادات التجارة</h2>
                <p className="text-blue-100">اكتشف أسرار النجاح في التجارة الدولية</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="ابحث عن النصائح..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Tips Grid */}
        <div className="space-y-4">
          {filteredTips.map((tip) => {
            const IconComponent = tip.icon;
            return (
              <Card key={tip.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${tip.color}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{tip.title}</CardTitle>
                        <Badge variant="outline" className="mt-1">{tip.category}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 leading-relaxed">{tip.content}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{tip.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{tip.views.toLocaleString()} مشاهدة</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                      قراءة المزيد
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredTips.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد نصائح</h3>
              <p className="text-gray-500">لم نجد نصائح تطابق بحثك</p>
            </CardContent>
          </Card>
        )}

        {/* CTA Section */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <h3 className="font-bold text-green-800 mb-2">هل لديك نصيحة مفيدة؟</h3>
            <p className="text-green-700 mb-4">شاركها مع المجتمع واستفد من خبرات الآخرين</p>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              شارك نصيحتك
            </Button>
          </CardContent>
        </Card>
      </div>

      <FixedFooter currentLanguage={currentLanguage} />
    </div>
  );
};

export default Tips;