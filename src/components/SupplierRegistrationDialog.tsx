
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { sanitizeFormData, isValidEmail, isValidPhone, sanitizeURL } from "@/utils/security";
import { getTranslation } from "@/utils/translations";
import { useLanguage } from "@/hooks/useLanguage";

interface SupplierRegistrationDialogProps {
  children: React.ReactNode;
}

const SupplierRegistrationDialog = ({ children }: SupplierRegistrationDialogProps) => {
  const { currentLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    businessType: '',
    businessLicense: '',
    taxNumber: '',
    yearEstablished: '',
    employeeCount: '',
    website: '',
    productsServices: '',
    targetMarkets: '',
    certifications: '',
    bankName: '',
    bankAccount: '',
    companyDescription: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Basic validation for input length
    if (value.length > 1000) {
      return; // Prevent overly long inputs
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    // Validate email and phone
    if (!isValidEmail(formData.email)) {
      alert('البريد الإلكتروني غير صحيح');
      return;
    }
    
    if (!isValidPhone(formData.phone)) {
      alert('رقم الهاتف غير صحيح');
      return;
    }
    
    // Sanitize website URL if provided
    if (formData.website) {
      const sanitizedURL = sanitizeURL(formData.website);
      if (!sanitizedURL && formData.website.trim() !== '') {
        alert('رابط الموقع الإلكتروني غير صحيح');
        return;
      }
      formData.website = sanitizedURL;
    }
    
    // Sanitize all form data
    const sanitizedData = sanitizeFormData(formData);
    console.log('Supplier form submitted:', sanitizedData);
    alert('تم تسجيل بياناتك كمورد بنجاح! سنراجع طلبك ونتواصل معك قريباً.');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            سجل وبيع بسهولة
          </DialogTitle>
          <p className="text-lg text-gray-600 text-center mb-2">أنت مصنع أو مورد أو تاجر جملة؟</p>
          <p className="text-sm text-gray-500 text-center">
            {getTranslation("joinPlatform", currentLanguage)}
          </p>
        </DialogHeader>

        <Card className="border-0 shadow-none">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-base font-medium">
                    اسم الشركة / المصنع *
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="أدخل اسم شركتك أو مصنعك"
                    required
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactName" className="text-base font-medium">
                    اسم الشخص المسؤول *
                  </Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="أدخل اسمك الكامل"
                    required
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-medium">
                    البريد الإلكتروني *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@company.com"
                    required
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base font-medium">
                    رقم الهاتف *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+971 50 123 4567"
                    required
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="text-base font-medium">
                    الدولة *
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="الإمارات العربية المتحدة"
                    required
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-base font-medium">
                    المدينة *
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="دبي"
                    required
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType" className="text-base font-medium">
                    نوع النشاط التجاري *
                  </Label>
                  <Select onValueChange={(value) => handleSelectChange('businessType', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="اختر نوع النشاط" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manufacturer">مصنع</SelectItem>
                      <SelectItem value="supplier">مورد</SelectItem>
                      <SelectItem value="wholesaler">تاجر جملة</SelectItem>
                      <SelectItem value="distributor">موزع</SelectItem>
                      <SelectItem value="exporter">مصدر</SelectItem>
                      <SelectItem value="importer">مستورد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessLicense" className="text-base font-medium">
                    رقم الرخصة التجارية *
                  </Label>
                  <Input
                    id="businessLicense"
                    name="businessLicense"
                    value={formData.businessLicense}
                    onChange={handleInputChange}
                    placeholder="أدخل رقم الرخصة التجارية"
                    required
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxNumber" className="text-base font-medium">
                    الرقم الضريبي
                  </Label>
                  <Input
                    id="taxNumber"
                    name="taxNumber"
                    value={formData.taxNumber}
                    onChange={handleInputChange}
                    placeholder="أدخل الرقم الضريبي"
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearEstablished" className="text-base font-medium">
                    سنة التأسيس *
                  </Label>
                  <Input
                    id="yearEstablished"
                    name="yearEstablished"
                    type="number"
                    value={formData.yearEstablished}
                    onChange={handleInputChange}
                    placeholder="2010"
                    required
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeCount" className="text-base font-medium">
                    عدد الموظفين *
                  </Label>
                  <Select onValueChange={(value) => handleSelectChange('employeeCount', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="اختر عدد الموظفين" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 موظفين</SelectItem>
                      <SelectItem value="11-50">11-50 موظف</SelectItem>
                      <SelectItem value="51-100">51-100 موظف</SelectItem>
                      <SelectItem value="101-500">101-500 موظف</SelectItem>
                      <SelectItem value="500+">أكثر من 500 موظف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-base font-medium">
                    الموقع الإلكتروني
                  </Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://www.company.com"
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="productsServices" className="text-base font-medium">
                    المنتجات والخدمات *
                  </Label>
                  <Textarea
                    id="productsServices"
                    name="productsServices"
                    value={formData.productsServices}
                    onChange={handleInputChange}
                    placeholder="اذكر المنتجات والخدمات التي تقدمها..."
                    required
                    className="min-h-24 text-base"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="targetMarkets" className="text-base font-medium">
                    الأسواق المستهدفة
                  </Label>
                  <Textarea
                    id="targetMarkets"
                    name="targetMarkets"
                    value={formData.targetMarkets}
                    onChange={handleInputChange}
                    placeholder="اذكر الأسواق والدول التي تستهدفها..."
                    className="min-h-20 text-base"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="certifications" className="text-base font-medium">
                    الشهادات والاعتمادات
                  </Label>
                  <Textarea
                    id="certifications"
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleInputChange}
                    placeholder="اذكر الشهادات والاعتمادات الحاصل عليها (ISO, CE, FDA, إلخ)..."
                    className="min-h-20 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankName" className="text-base font-medium">
                    اسم البنك
                  </Label>
                  <Input
                    id="bankName"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    placeholder="اسم البنك"
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankAccount" className="text-base font-medium">
                    رقم الحساب البنكي
                  </Label>
                  <Input
                    id="bankAccount"
                    name="bankAccount"
                    value={formData.bankAccount}
                    onChange={handleInputChange}
                    placeholder="رقم الحساب البنكي"
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="companyDescription" className="text-base font-medium">
                    نبذة عن الشركة
                  </Label>
                  <Textarea
                    id="companyDescription"
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleInputChange}
                    placeholder="اكتب نبذة مختصرة عن شركتك وخبرتها في السوق..."
                    className="min-h-24 text-base"
                  />
                </div>
              </div>

              <div className="text-center pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-12 py-4 text-lg"
                >
                  سجل كمورد الآن
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  {getTranslation("termsAgreement", currentLanguage)}
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default SupplierRegistrationDialog;
