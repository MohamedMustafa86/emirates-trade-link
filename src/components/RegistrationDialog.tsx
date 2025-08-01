
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
import { ArrowLeft } from "lucide-react";
import { getTranslation } from "@/utils/translations";
import { useLanguage } from "@/hooks/useLanguage";

interface RegistrationDialogProps {
  children: React.ReactNode;
}

const RegistrationDialog = ({ children }: RegistrationDialogProps) => {
  const { currentLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    country: '',
    productsInterest: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('تم تسجيل بياناتك بنجاح! سنتواصل معك قريباً.');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            سجل و تواصل مع المصانع و الموردين في دول الخليج
          </DialogTitle>
          <p className="text-lg text-gray-600 text-center mb-2">سجل مجاناً</p>
          <p className="text-sm text-gray-500 text-center">
            {getTranslation("joinNetwork", currentLanguage)}
          </p>
        </DialogHeader>

        <Card className="border-0 shadow-none">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-base font-medium">
                    اسم الشركة *
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="أدخل اسم شركتك"
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

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="productsInterest" className="text-base font-medium">
                    المنتجات التي تهتم بها
                  </Label>
                  <Textarea
                    id="productsInterest"
                    name="productsInterest"
                    value={formData.productsInterest}
                    onChange={handleInputChange}
                    placeholder="اذكر نوع المنتجات أو الخدمات التي تبحث عنها..."
                    className="min-h-24 text-base"
                  />
                </div>
              </div>

              <div className="text-center pt-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-12 py-4 text-lg"
                >
                  سجل الآن مجاناً
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

export default RegistrationDialog;
