
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import StarRating from "@/components/StarRating";
import { User, Package, Clock, Shield, MessageSquare } from "lucide-react";

const SupplierRating = () => {
  const [supplierRating, setSupplierRating] = useState(0);
  const [productQuality, setProductQuality] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [review, setReview] = useState("");
  const [supplierName, setSupplierName] = useState("");

  const handleSubmitRating = () => {
    const ratingData = {
      supplierName,
      supplierRating,
      productQuality,
      deliveryTime,
      communication,
      review,
      date: new Date().toISOString()
    };
    
    console.log("تم إرسال التقييم:", ratingData);
    // هنا يمكن إرسال البيانات إلى API
    alert("تم إرسال تقييمك بنجاح!");
  };

  const canSubmit = supplierName && supplierRating > 0 && productQuality > 0 && deliveryTime > 0 && communication > 0;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">تقييم المورد</h1>
            <p className="text-xl text-gray-600">شاركنا تجربتك مع المورد لمساعدة المشترين الآخرين</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* نموذج التقييم */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-6 w-6 ml-2 text-blue-600" />
                  تقييم جديد
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اسم المورد
                  </label>
                  <Input
                    type="text"
                    placeholder="أدخل اسم المورد"
                    value={supplierName}
                    onChange={(e) => setSupplierName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    التقييم العام للمورد
                  </label>
                  <StarRating
                    rating={supplierRating}
                    onRatingChange={setSupplierRating}
                    size="lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <Package className="h-4 w-4 ml-2 text-blue-600" />
                    جودة المنتجات
                  </label>
                  <StarRating
                    rating={productQuality}
                    onRatingChange={setProductQuality}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <Clock className="h-4 w-4 ml-2 text-blue-600" />
                    سرعة التسليم
                  </label>
                  <StarRating
                    rating={deliveryTime}
                    onRatingChange={setDeliveryTime}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <MessageSquare className="h-4 w-4 ml-2 text-blue-600" />
                    التواصل والخدمة
                  </label>
                  <StarRating
                    rating={communication}
                    onRatingChange={setCommunication}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تعليق إضافي (اختياري)
                  </label>
                  <Textarea
                    placeholder="شاركنا تفاصيل تجربتك مع هذا المورد..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button 
                  onClick={handleSubmitRating}
                  disabled={!canSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  إرسال التقييم
                </Button>
              </CardContent>
            </Card>

            {/* أمثلة على تقييمات سابقة */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">التقييمات الأخيرة</h3>
              
              {[
                {
                  supplier: "مزارع النخيل",
                  rating: 4.8,
                  productQuality: 5,
                  deliveryTime: 4,
                  communication: 5,
                  review: "مورد ممتاز، المنتجات عالية الجودة والتسليم في الموعد",
                  date: "منذ يومين"
                },
                {
                  supplier: "الصناعات المعدنية",
                  rating: 4.2,
                  productQuality: 4,
                  deliveryTime: 4,
                  communication: 4,
                  review: "جودة جيدة جداً، لكن التسليم تأخر قليلاً",
                  date: "منذ أسبوع"
                }
              ].map((rating, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-800">{rating.supplier}</h4>
                      <span className="text-sm text-gray-500">{rating.date}</span>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">التقييم العام:</span>
                        <StarRating rating={rating.rating} readonly size="sm" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">جودة المنتجات:</span>
                        <StarRating rating={rating.productQuality} readonly size="sm" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">سرعة التسليم:</span>
                        <StarRating rating={rating.deliveryTime} readonly size="sm" />
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 italic">"{rating.review}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupplierRating;
