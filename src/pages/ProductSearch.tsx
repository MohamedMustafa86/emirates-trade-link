
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import { Search, Filter, SlidersHorizontal, Package } from "lucide-react";

const ProductSearch = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const mockProducts = [
    {
      id: "1",
      name: "تمور المدينة الفاخرة",
      description: "تمور طبيعية عالية الجودة من المدينة المنورة، معبأة بعناية فائقة",
      price: 45.0,
      imageUrl: "https://images.unsplash.com/photo-1559181567-c3190ca9959b",
      supplier: "مزارع النخيل",
      origin: "السعودية",
      category: "المواد الغذائية",
      rating: 4.8
    },
    {
      id: "2", 
      name: "زيت الزيتون البكر",
      description: "زيت زيتون بكر ممتاز من أجود أشجار الزيتون في المنطقة",
      price: 25.0,
      imageUrl: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
      supplier: "مصانع الخليج",
      origin: "الإمارات",
      category: "المواد الغذائية", 
      rating: 4.6
    },
    {
      id: "3",
      name: "أنابيب فولاذية صناعية",
      description: "أنابيب فولاذية عالية الجودة للاستخدام الصناعي والإنشائي",
      price: 120.5,
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      supplier: "الصناعات المعدنية",
      origin: "الإمارات",
      category: "مواد البناء",
      rating: 4.7
    },
    {
      id: "4",
      name: "قوارير بلاستيكية",
      description: "قوارير بلاستيكية صديقة للبيئة بأحجام مختلفة",
      price: 0.25,
      imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3",
      supplier: "البلاستيك المتطور",
      origin: "الكويت",
      category: "التعبئة والتغليف",
      rating: 4.5
    }
  ];

  const categories = ["الكل", "المواد الغذائية", "مواد البناء", "التعبئة والتغليف", "الإلكترونيات"];

  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  const handleSearch = () => {
    let filtered = mockProducts;
    
    if (query) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.supplier.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (selectedCategory !== "الكل") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">البحث المتقدم عن المنتجات</h1>
          <p className="text-xl text-gray-600">اكتشف أفضل المنتجات الخليجية والإماراتية</p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="ابحث عن المنتجات، الموردين، أو الفئات..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="text-lg"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
                  <Search className="ml-2 h-4 w-4" />
                  بحث
                </Button>
                <Button variant="outline">
                  <SlidersHorizontal className="ml-2 h-4 w-4" />
                  فلترة
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">الفئات</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => {
                  setSelectedCategory(category);
                  setTimeout(handleSearch, 0);
                }}
                className={selectedCategory === category ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            تم العثور على {filteredProducts.length} منتج
            {query && ` لـ "${query}"`}
            {selectedCategory !== "الكل" && ` في فئة "${selectedCategory}"`}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Package className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-600">جرب تغيير كلمات البحث أو الفلاتر</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductSearch;
