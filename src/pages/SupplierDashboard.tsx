
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Plus, Package, BarChart3, MessageSquare, Star, TrendingUp, Users, DollarSign } from "lucide-react";

const SupplierDashboard = () => {
  const stats = [
    {
      title: "إجمالي المنتجات",
      value: "24",
      icon: <Package className="h-8 w-8 text-blue-600" />,
      change: "+3 هذا الشهر"
    },
    {
      title: "الطلبات الجديدة",
      value: "8",
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      change: "+2 اليوم"
    },
    {
      title: "التقييمات",
      value: "4.8",
      icon: <Star className="h-8 w-8 text-yellow-600" />,
      change: "من أصل 5"
    },
    {
      title: "العملاء",
      value: "156",
      icon: <Users className="h-8 w-8 text-purple-600" />,
      change: "+12 هذا الشهر"
    }
  ];

  const recentProducts = [
    {
      name: "تمور المدينة الفاخرة",
      price: "$45.00",
      status: "نشط",
      orders: 12
    },
    {
      name: "زيت الزيتون البكر",
      price: "$25.00", 
      status: "نشط",
      orders: 8
    },
    {
      name: "العسل الطبيعي",
      price: "$35.00",
      status: "مؤقت",
      orders: 5
    }
  ];

  const recentOrders = [
    {
      id: "#ORD-001",
      product: "تمور المدينة",
      buyer: "شركة الإمارات للتجارة",
      amount: "$450.00",
      status: "جديد"
    },
    {
      id: "#ORD-002", 
      product: "زيت الزيتون",
      buyer: "مؤسسة الخليج",
      amount: "$275.00",
      status: "قيد المعالجة"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">لوحة تحكم المورد</h1>
            <p className="text-gray-600 mt-2">مرحباً بك في لوحة التحكم الخاصة بك</p>
          </div>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link to="/add-product">
              <Plus className="ml-2 h-4 w-4" />
              إضافة منتج جديد
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Products Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="ml-2 h-5 w-5" />
                إدارة المنتجات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-800">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.price} • {product.orders} طلبات</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === 'نشط' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                عرض جميع المنتجات
              </Button>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="ml-2 h-5 w-5" />
                الطلبات الحديثة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-800">{order.id}</h4>
                      <p className="text-sm text-gray-600">{order.product}</p>
                      <p className="text-xs text-gray-500">{order.buyer}</p>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-green-600">{order.amount}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'جديد'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                عرض جميع الطلبات
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>الإجراءات السريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link to="/messages">
                  <MessageSquare className="h-6 w-6 mb-2" />
                  الرسائل
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link to="/analytics">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  التحليلات
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col">
                <Link to="/settings">
                  <DollarSign className="h-6 w-6 mb-2" />
                  الأسعار
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SupplierDashboard;
