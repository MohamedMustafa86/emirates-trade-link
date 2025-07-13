import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import FixedFooter from "@/components/FixedFooter";
import { useLanguage } from "@/hooks/useLanguage";
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CheckCircle } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  supplier: string;
}

const ShoppingCartPage = () => {
  const { currentLanguage } = useLanguage();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'أنابيب PVC عالية الجودة',
      price: 150,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122',
      supplier: 'مصنع الإمارات للبلاستيك'
    },
    {
      id: '2',
      name: 'مواد بناء متطورة',
      price: 320,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5',
      supplier: 'شركة دبي للمواد'
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const isRTL = currentLanguage === "العربية";

  return (
    <div className={`min-h-screen bg-gray-50 pb-20 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5" />
              {isRTL ? 'العودة' : 'Back'}
            </Button>
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold">{isRTL ? 'عربة المشتريات' : 'Shopping Cart'}</h1>
                <p className="text-gray-600">
                  {isRTL ? `${getTotalItems()} عنصر` : `${getTotalItems()} items`}
                </p>
              </div>
            </div>
          </div>
          
          <Badge variant="outline" className="text-lg px-4 py-2">
            {isRTL ? `${getTotalPrice()} د.إ` : `${getTotalPrice()} AED`}
          </Badge>
        </div>

        {cartItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold mb-2">
                {isRTL ? 'عربة المشتريات فارغة' : 'Your cart is empty'}
              </h2>
              <p className="text-gray-600 mb-6">
                {isRTL ? 'ابدأ التسوق لإضافة منتجات إلى العربة' : 'Start shopping to add products to your cart'}
              </p>
              <Button onClick={() => window.location.href = '/products'}>
                {isRTL ? 'تصفح المنتجات' : 'Browse Products'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{item.supplier}</p>
                        <p className="text-blue-600 font-bold">
                          {isRTL ? `${item.price} د.إ` : `${item.price} AED`}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border rounded-lg">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-3 py-1 min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800 h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>{isRTL ? 'ملخص الطلب' : 'Order Summary'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>{isRTL ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                    <span>{isRTL ? `${getTotalPrice()} د.إ` : `${getTotalPrice()} AED`}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>{isRTL ? 'الشحن:' : 'Shipping:'}</span>
                    <span className="text-green-600">{isRTL ? 'مجاني' : 'Free'}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>{isRTL ? 'الضريبة:' : 'Tax:'}</span>
                    <span>{isRTL ? `${Math.round(getTotalPrice() * 0.05)} د.إ` : `${Math.round(getTotalPrice() * 0.05)} AED`}</span>
                  </div>
                  
                  <hr className="my-4" />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>{isRTL ? 'المجموع:' : 'Total:'}</span>
                    <span className="text-blue-600">
                      {isRTL ? `${Math.round(getTotalPrice() * 1.05)} د.إ` : `${Math.round(getTotalPrice() * 1.05)} AED`}
                    </span>
                  </div>
                  
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {isRTL ? 'إتمام الطلب' : 'Checkout'}
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    {isRTL ? 'متابعة التسوق' : 'Continue Shopping'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <FixedFooter currentLanguage={currentLanguage} />
    </div>
  );
};

export default ShoppingCartPage;