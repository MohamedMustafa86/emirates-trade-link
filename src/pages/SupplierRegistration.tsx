import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Building, FileText, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import FixedFooter from "@/components/FixedFooter";
import { useLanguage } from "@/hooks/useLanguage";

const SupplierRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentLanguage } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    companyName: '',
    businessType: '',
    description: '',
    licenseNumber: '',
    website: '',
    logoUrl: ''
  });

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }
    setCurrentUser(session.user);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!currentUser) {
      toast({
        title: "خطأ",
        description: "يجب تسجيل الدخول أولاً",
        variant: "destructive"
      });
      return;
    }

    if (!formData.companyName || !formData.businessType) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Check if supplier already exists
      const { data: existingSupplier } = await supabase
        .from('suppliers')
        .select('id')
        .eq('id', currentUser.id)
        .single();

      if (existingSupplier) {
        toast({
          title: "تنبيه",
          description: "تم تسجيلك كمورد مسبقاً",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // Insert supplier data
      const { error } = await supabase
        .from('suppliers')
        .insert({
          id: currentUser.id,
          company_name: formData.companyName,
          business_type: formData.businessType,
          description: formData.description,
          license_number: formData.licenseNumber,
          website: formData.website,
          logo_url: formData.logoUrl,
          status: 'pending'
        });

      if (error) {
        throw error;
      }

      // Update user type
      await supabase
        .from('users')
        .update({ user_type: 'supplier' })
        .eq('id', currentUser.id);

      toast({
        title: "تم بنجاح",
        description: "تم تقديم طلب التسجيل كمورد. سيتم مراجعة طلبكم والرد عليكم قريباً.",
      });

      navigate('/supplier-dashboard');

    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء التسجيل",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const businessTypes = [
    'تصنيع',
    'استيراد وتصدير',
    'توزيع',
    'خدمات لوجستية',
    'تجارة إلكترونية',
    'أخرى'
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between border-b">
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-5 w-5 mr-2" />
          العودة للرئيسية
        </Link>
        <h1 className="text-lg font-bold">تسجيل المورد</h1>
        <div className="w-20"></div>
      </div>

      <div className="p-4 space-y-6">
        {/* Header Card */}
        <Card className="bg-gradient-to-l from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Building className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-1">انضم كمورد</h2>
                <p className="text-green-100">قدم منتجاتك لآلاف المشترين حول العالم</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              بيانات الشركة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">اسم الشركة *</Label>
              <Input
                id="companyName"
                placeholder="أدخل اسم شركتك"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="border-gray-300 focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">نوع النشاط التجاري *</Label>
              <Select onValueChange={(value) => handleInputChange('businessType', value)}>
                <SelectTrigger className="border-gray-300 focus:border-green-500">
                  <SelectValue placeholder="اختر نوع النشاط" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">وصف الشركة</Label>
              <Textarea
                id="description"
                placeholder="اكتب وصفاً موجزاً عن شركتك وأنشطتها"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="min-h-20 border-gray-300 focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="licenseNumber">رقم الرخصة التجارية</Label>
              <Input
                id="licenseNumber"
                placeholder="أدخل رقم الرخصة التجارية"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                className="border-gray-300 focus:border-green-500"
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">الموقع الإلكتروني</Label>
              <div className="relative">
                <Globe className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="website"
                  placeholder="https://www.yourcompany.com"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="pr-10 border-gray-300 focus:border-green-500"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logoUrl">شعار الشركة (رابط)</Label>
              <div className="relative">
                <Upload className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="logoUrl"
                  placeholder="رابط شعار الشركة"
                  value={formData.logoUrl}
                  onChange={(e) => handleInputChange('logoUrl', e.target.value)}
                  className="pr-10 border-gray-300 focus:border-green-500"
                  dir="ltr"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Process Info */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <h3 className="font-semibold text-green-800 mb-2">عملية المراجعة</h3>
            <div className="space-y-2 text-sm text-green-700">
              <p>• سيتم مراجعة طلبكم خلال 1-3 أيام عمل</p>
              <p>• سنتواصل معكم عبر البريد الإلكتروني لتأكيد التسجيل</p>
              <p>• بعد الموافقة، ستتمكنون من إضافة منتجاتكم وإدارة متجركم</p>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          disabled={isLoading || !formData.companyName || !formData.businessType}
          className="w-full bg-green-600 hover:bg-green-700 text-white h-12 font-semibold"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              جاري التسجيل...
            </div>
          ) : (
            'تقديم طلب التسجيل'
          )}
        </Button>

        <p className="text-xs text-gray-600 text-center">
          بتقديم هذا الطلب، أنت توافق على شروط الخدمة وسياسة الخصوصية
        </p>
      </div>

      <FixedFooter currentLanguage={currentLanguage} />
    </div>
  );
};

export default SupplierRegistration;