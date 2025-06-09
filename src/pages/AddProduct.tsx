
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { ArrowRight, Upload, Save } from "lucide-react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    origin: "",
    minOrder: "",
    leadTime: "",
    specifications: "",
    certifications: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product data:", formData);
    // هنا سيتم إرسال البيانات إلى قاعدة البيانات
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Link to="/supplier-dashboard" className="hover:text-green-600">لوحة التحكم</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800">إضافة منتج جديد</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">إضافة منتج جديد</h1>
            <p className="text-gray-600 mt-2">أضف منتجك الجديد إلى المنصة</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/supplier-dashboard">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة
            </Link>
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Product Information */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>معلومات المنتج الأساسية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="name">اسم المنتج *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="أدخل اسم المنتج"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">وصف المنتج *</Label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md resize-none h-32"
                      placeholder="اكتب وصفاً مفصلاً للمنتج..."
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">السعر (بالدولار) *</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">الفئة *</Label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">اختر الفئة</option>
                        <option value="المواد الغذائية">المواد الغذائية</option>
                        <option value="مواد البناء">مواد البناء</option>
                        <option value="التعبئة والتغليف">التعبئة والتغليف</option>
                        <option value="المواد الخام البلاستيكية">المواد الخام البلاستيكية</option>
                        <option value="السلع الاستهلاكية">السلع الاستهلاكية</option>
                        <option value="المعدات والآلات">المعدات والآلات</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="origin">بلد المنشأ *</Label>
                      <select
                        id="origin"
                        name="origin"
                        value={formData.origin}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">اختر البلد</option>
                        <option value="الإمارات العربية المتحدة">الإمارات العربية المتحدة</option>
                        <option value="السعودية">السعودية</option>
                        <option value="الكويت">الكويت</option>
                        <option value="قطر">قطر</option>
                        <option value="البحرين">البحرين</option>
                        <option value="عمان">عمان</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="minOrder">الحد الأدنى للطلب</Label>
                      <Input
                        id="minOrder"
                        name="minOrder"
                        value={formData.minOrder}
                        onChange={handleInputChange}
                        placeholder="مثال: 100 قطعة"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Technical Specifications */}
              <Card>
                <CardHeader>
                  <CardTitle>المواصفات التقنية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="specifications">المواصفات الفنية</Label>
                    <textarea
                      id="specifications"
                      name="specifications"
                      value={formData.specifications}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md resize-none h-24"
                      placeholder="الأبعاد، الوزن، المواد، إلخ..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="leadTime">وقت التسليم</Label>
                      <Input
                        id="leadTime"
                        name="leadTime"
                        value={formData.leadTime}
                        onChange={handleInputChange}
                        placeholder="مثال: 15-20 يوم"
                      />
                    </div>
                    <div>
                      <Label htmlFor="certifications">الشهادات</Label>
                      <Input
                        id="certifications"
                        name="certifications"
                        value={formData.certifications}
                        onChange={handleInputChange}
                        placeholder="مثال: ISO 9001, CE"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Images */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>صور المنتج</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">اسحب الصور هنا أو</p>
                    <Button variant="outline" type="button">
                      اختر الملفات
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">
                      PNG, JPG, GIF حتى 10MB
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="mt-6 space-y-4">
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  <Save className="ml-2 h-4 w-4" />
                  حفظ المنتج
                </Button>
                <Button type="button" variant="outline" className="w-full">
                  حفظ كمسودة
                </Button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddProduct;
