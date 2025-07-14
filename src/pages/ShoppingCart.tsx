import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart as CartIcon, Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import FixedFooter from "@/components/FixedFooter";
import { useLanguage } from "@/hooks/useLanguage";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  supplier: string;
}

const ShoppingCart = () => {
  const { currentLanguage } = useLanguage();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'مواد بناء عالية الجودة',
      price: 1500,
      quantity: 2,
      image: '/lovable-uploads/f4d19333-8a05-44bc-bcfa-76cc5bae4859.png',
      supplier: 'شركة الإمارات للمواد'
    },
    {
      id: '2',
      name: 'أجهزة إلكترونية',
      price: 2500,
      quantity: 1,
      image: '/lovable-uploads/c7715e31-8323-48d1-b768-76d1ecfe655c.png',
      supplier: 'مؤسسة التقنية المتطورة'
    }
  ]);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between border-b">
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-5 w-5 mr-2" />
          العودة للرئيسية
        </Link>
        <h1 className="text-lg font-bold flex items-center gap-2">
          <CartIcon className="h-5 w-5" />
          عربة التسوق
        </h1>
        <div className="w-20"></div>
      </div>

      <div className="p-4 space-y-4">
        {cartItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <CartIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">عربة التسوق فارغة</h3>
              <p className="text-gray-500 mb-4">لم تضف أي منتجات بعد</p>
              <Link to="/products">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  تصفح المنتجات
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <Card key={item.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.supplier}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-green-600">{item.price * item.quantity} درهم</p>
                            <p className="text-xs text-gray-500">{item.price} درهم للوحدة</p>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="font-semibold">{totalPrice} درهم</span>
                </div>
                <div className="flex justify-between">
                  <span>الشحن:</span>
                  <span className="text-green-600">مجاني</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>المجموع الكلي:</span>
                  <span className="text-green-600">{totalPrice} درهم</span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12 font-semibold">
                متابعة إلى الدفع
              </Button>
              <Link to="/products" className="block">
                <Button variant="outline" className="w-full h-12">
                  متابعة التسوق
                </Button>
              </Link>
            </div>

            {/* Shopping Tips */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-blue-800 mb-2">نصائح التسوق</h3>
                <div className="space-y-1 text-sm text-blue-700">
                  <p>• تحقق من أسعار الشحن قبل إتمام الطلب</p>
                  <p>• راجع سياسة الإرجاع للمورد</p>
                  <p>• تواصل مع المورد للحصول على خصومات كمية</p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <FixedFooter currentLanguage={currentLanguage} />
    </div>
  );
};

export default ShoppingCart;