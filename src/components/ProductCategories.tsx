
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslation } from "@/utils/translations";

interface ProductCategoriesProps {
  currentLanguage: string;
}

const ProductCategories = ({ currentLanguage }: ProductCategoriesProps) => {
  const productCategories = [
    {
      title: getTranslation("consumerProducts", currentLanguage),
      emoji: "🧴",
      description: getTranslation("consumerProductsDesc", currentLanguage),
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883",
      link: "/products/consumer-goods",
      subcategories: ["العطور", "مستحضرات التجميل", "مواد التنظيف", "العناية الشخصية"]
    },
    {
      title: getTranslation("foodProducts", currentLanguage),
      emoji: "🍱",
      description: getTranslation("foodProductsDesc", currentLanguage),
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      link: "/products/food-products",
      subcategories: ["التمور ومشتقاتها", "الألبان والعصائر", "الأغذية المعلبة والمجمدة", "التوابل والزيوت"]
    },
    {
      title: getTranslation("buildingMaterials", currentLanguage),
      emoji: "🏗️",
      description: getTranslation("buildingMaterialsDesc", currentLanguage),
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
      link: "/products/building-materials",
      subcategories: ["السيراميك والبورسلين", "الزجاج الصناعي", "الأدوات الصحية", "الألمنيوم والحديد"]
    },
    {
      title: getTranslation("industrialProducts", currentLanguage),
      emoji: "⚙️",
      description: getTranslation("industrialProductsDesc", currentLanguage),
      image: "/lovable-uploads/c7715e31-8323-48d1-b768-76d1ecfe655c.png",
      link: "/products/industrial-products",
      subcategories: ["الأنابيب والكابلات", "المعدات الكهربائية", "المنتجات البلاستيكية", "الفلاتر والمكونات الصناعية"]
    },
    {
      title: getTranslation("smartTech", currentLanguage),
      emoji: "💡",
      description: getTranslation("smartTechDesc", currentLanguage),
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      link: "/products/smart-tech",
      subcategories: ["أجهزة المراقبة", "حلول المنازل الذكية", "تطبيقات وخدمات SaaS", "أجهزة إلكترونية خفيفة"]
    },
    {
      title: getTranslation("medicalHealth", currentLanguage),
      emoji: "💊",
      description: getTranslation("medicalHealthDesc", currentLanguage),
      image: "/lovable-uploads/ca03062d-8feb-454f-9fd4-dd33ace0c1ed.png",
      link: "/products/medical-health",
      subcategories: ["الأدوية والمكملات", "القفازات والكمامات", "أدوات الإسعاف الأولي", "العبوات الطبية"]
    },
    {
      title: getTranslation("packagingSupplies", currentLanguage),
      emoji: "📦",
      description: getTranslation("packagingSuppliesDesc", currentLanguage),
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
      link: "/products/packaging-supplies",
      subcategories: ["عبوات بلاستيكية وزجاجية", "لفائف تغليف وصناديق", "ملصقات وباركودات", "حلول تغليف صديقة للبيئة"]
    },
    {
      title: getTranslation("furniture", currentLanguage),
      emoji: "🪑",
      description: getTranslation("furnitureDesc", currentLanguage),
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
      link: "/products/furniture",
      subcategories: ["أثاث خشبي ومعدني", "مفروشات فندقية", "مراتب وستائر", "سجاد وسجاد صناعي"]
    },
    {
      title: getTranslation("sustainable", currentLanguage),
      emoji: "🌿",
      description: getTranslation("sustainableDesc", currentLanguage),
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
      link: "/products/sustainable",
      subcategories: ["منتجات قابلة للتحلل", "أنظمة طاقة شمسية", "حلول تدوير", "أدوات توفير المياه والطاقة"]
    }
  ];

  return (
    <section className="py-8" id="product-categories">
      <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3">
        {getTranslation("productCategories", currentLanguage)}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {productCategories.map((category, index) => (
          <Link key={index} to={category.link} className="block">
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 h-full">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <span className="text-2xl">{category.emoji}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{category.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{category.description}</p>
                  <div className="space-y-1">
                    {category.subcategories.slice(0, 2).map((sub, idx) => (
                      <div key={idx} className="flex items-center text-xs text-gray-500">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full ml-2"></div>
                        {sub}
                      </div>
                    ))}
                    {category.subcategories.length > 2 && (
                      <div className="text-xs text-blue-600 font-medium">
                        +{category.subcategories.length - 2} المزيد
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductCategories;
