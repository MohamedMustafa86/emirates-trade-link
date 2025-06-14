
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, Truck, Shield, Clock, Search, Menu, Home, Grid3X3, MessageCircle, User, Globe } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import { getTranslation } from "@/utils/translations";

const Products = () => {
  const [currentLanguage, setCurrentLanguage] = useState("العربية");

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    console.log(`Language changed to: ${language}`);
    
    const body = document.body;
    const html = document.documentElement;
    
    if (language === "العربية") {
      body.dir = "rtl";
      html.dir = "rtl";
      html.lang = "ar";
      body.style.direction = "rtl";
    } else {
      body.dir = "ltr";
      html.dir = "ltr";
      body.style.direction = "ltr";
      html.lang = language === "English" ? "en" : "fr";
    }
    
    document.documentElement.style.setProperty('--text-direction', language === "العربية" ? 'rtl' : 'ltr');
  };

  const productCategories = [
    {
      titleAr: "مواد البناء",
      titleEn: "Building Materials",
      titleFr: "Matériaux de construction",
      descriptionAr: "أحدث مواد البناء والإنشاء من أفضل المصانع العالمية",
      descriptionEn: "Latest building and construction materials from the best global factories",
      descriptionFr: "Derniers matériaux de construction des meilleures usines mondiales",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5",
      link: "/products/building-materials",
      featuresAr: ["خرسانة عالية الجودة", "حديد التسليح", "مواد العزل الحراري", "الطوب والبلاط"],
      featuresEn: ["High-quality concrete", "Reinforcement steel", "Thermal insulation materials", "Bricks and tiles"],
      featuresFr: ["Béton de haute qualité", "Acier de renforcement", "Matériaux d'isolation thermique", "Briques et carreaux"]
    },
    {
      titleAr: "مواد التعبئة والتغليف",
      titleEn: "Packaging Supplies",
      titleFr: "Fournitures d'emballage",
      descriptionAr: "حلول تعبئة وتغليف متطورة لجميع الصناعات",
      descriptionEn: "Advanced packaging solutions for all industries",
      descriptionFr: "Solutions d'emballage avancées pour toutes les industries",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
      link: "/products/packaging-supplies",
      featuresAr: ["أكياس بلاستيكية", "صناديق كرتونية", "مواد حماية", "علب معدنية"],
      featuresEn: ["Plastic bags", "Cardboard boxes", "Protective materials", "Metal containers"],
      featuresFr: ["Sacs plastiques", "Boîtes en carton", "Matériaux de protection", "Contenants métalliques"]
    },
    {
      titleAr: "المواد الخام البلاستيكية",
      titleEn: "Plastic Raw Materials",
      titleFr: "Matières premières plastiques",
      descriptionAr: "مواد خام بلاستيكية عالية النقاء للصناعات المختلفة",
      descriptionEn: "High-purity plastic raw materials for various industries",
      descriptionFr: "Matières premières plastiques de haute pureté pour diverses industries",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3",
      link: "/products/plastic-raw-materials",
      featuresAr: ["بولي إيثيلين", "بولي بروبيلين", "PVC", "البلاستيك المعاد تدويره"],
      featuresEn: ["Polyethylene", "Polypropylene", "PVC", "Recycled plastic"],
      featuresFr: ["Polyéthylène", "Polypropylène", "PVC", "Plastique recyclé"]
    },
    {
      titleAr: "السلع الاستهلاكية",
      titleEn: "Consumer Goods",
      titleFr: "Biens de consommation",
      descriptionAr: "منتجات استهلاكية متنوعة لتلبية احتياجات السوق المحلي",
      descriptionEn: "Diverse consumer products to meet local market needs",
      descriptionFr: "Produits de consommation diversifiés pour répondre aux besoins du marché local",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43",
      link: "/products/consumer-goods",
      featuresAr: ["الإلكترونيات", "المنتجات المنزلية", "الألعاب", "مستحضرات التجميل"],
      featuresEn: ["Electronics", "Home products", "Toys", "Cosmetics"],
      featuresFr: ["Électronique", "Produits ménagers", "Jouets", "Cosmétiques"]
    },
    {
      titleAr: "المعدات والآلات",
      titleEn: "Machinery & Equipment",
      titleFr: "Machines et équipements",
      descriptionAr: "معدات وآلات صناعية حديثة لمختلف القطاعات",
      descriptionEn: "Modern industrial machinery and equipment for various sectors",
      descriptionFr: "Machines et équipements industriels modernes pour divers secteurs",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      link: "/products/machinery-equipment",
      featuresAr: ["آلات التصنيع", "معدات البناء", "أنظمة الأتمتة", "قطع الغيار"],
      featuresEn: ["Manufacturing machines", "Construction equipment", "Automation systems", "Spare parts"],
      featuresFr: ["Machines de fabrication", "Équipements de construction", "Systèmes d'automatisation", "Pièces de rechange"]
    }
  ];

  const advantages = [
    {
      icon: <Package className="h-8 w-8 text-green-600" />,
      titleAr: "جودة مضمونة",
      titleEn: "Guaranteed Quality",
      titleFr: "Qualité garantie",
      descriptionAr: "منتجات من مصانع معتمدة وموثوقة عالمياً",
      descriptionEn: "Products from globally certified and trusted factories",
      descriptionFr: "Produits d'usines certifiées et fiables mondialement"
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      titleAr: "شهادات دولية",
      titleEn: "International Certificates",
      titleFr: "Certificats internationaux",
      descriptionAr: "جميع منتجاتنا تحمل شهادات الجودة المطلوبة",
      descriptionEn: "All our products carry required quality certificates",
      descriptionFr: "Tous nos produits portent les certificats de qualité requis"
    },
    {
      icon: <Truck className="h-8 w-8 text-green-600" />,
      titleAr: "توصيل سريع",
      titleEn: "Fast Delivery",
      titleFr: "Livraison rapide",
      descriptionAr: "خدمات لوجستية متطورة وتوصيل في الوقت المحدد",
      descriptionEn: "Advanced logistics services and on-time delivery",
      descriptionFr: "Services logistiques avancés et livraison à temps"
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      titleAr: "دعم على مدار الساعة",
      titleEn: "24/7 Support",
      titleFr: "Support 24h/24",
      descriptionAr: "فريق دعم فني متخصص متاح دائماً لخدمتكم",
      descriptionEn: "Specialized technical support team always available to serve you",
      descriptionFr: "Équipe de support technique spécialisée toujours disponible pour vous servir"
    }
  ];

  const getCategoryTitle = (category: any) => {
    return currentLanguage === "العربية" ? category.titleAr : 
           currentLanguage === "English" ? category.titleEn : category.titleFr;
  };

  const getCategoryDescription = (category: any) => {
    return currentLanguage === "العربية" ? category.descriptionAr : 
           currentLanguage === "English" ? category.descriptionEn : category.descriptionFr;
  };

  const getCategoryFeatures = (category: any) => {
    return currentLanguage === "العربية" ? category.featuresAr : 
           currentLanguage === "English" ? category.featuresEn : category.featuresFr;
  };

  const getAdvantageTitle = (advantage: any) => {
    return currentLanguage === "العربية" ? advantage.titleAr : 
           currentLanguage === "English" ? advantage.titleEn : advantage.titleFr;
  };

  const getAdvantageDescription = (advantage: any) => {
    return currentLanguage === "العربية" ? advantage.descriptionAr : 
           currentLanguage === "English" ? advantage.descriptionEn : advantage.descriptionFr;
  };

  return (
    <div 
      className="min-h-screen bg-gray-50" 
      dir={currentLanguage === "العربية" ? "rtl" : "ltr"}
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <Header 
        currentLanguage={currentLanguage} 
        onLanguageChange={handleLanguageChange} 
      />
      
      <div className="pt-32">
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="text-center py-12 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg mb-12">
            <h1 className="text-4xl font-bold mb-4">{getTranslation("productsNav", currentLanguage)}</h1>
            <p className="text-xl max-w-3xl mx-auto">
              {currentLanguage === "العربية" ? "مجموعة شاملة من المنتجات عالية الجودة من أفضل المصانع العالمية" : 
               currentLanguage === "English" ? "Comprehensive range of high-quality products from the best global factories" : 
               "Gamme complète de produits de haute qualité des meilleures usines mondiales"}
            </p>
          </section>

          {/* Product Categories */}
          <section className="mb-12">
            <div className="grid gap-8">
              {productCategories.map((category, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className={`order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                        <img 
                          src={category.image} 
                          alt={getCategoryTitle(category)}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      </div>
                      <div className={`p-8 order-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{getCategoryTitle(category)}</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">{getCategoryDescription(category)}</p>
                        
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-800 mb-3">
                            {currentLanguage === "العربية" ? "المنتجات الرئيسية:" : 
                             currentLanguage === "English" ? "Main Products:" : "Produits principaux:"}
                          </h4>
                          <ul className="grid grid-cols-2 gap-2">
                            {getCategoryFeatures(category).map((feature: string, idx: number) => (
                              <li key={idx} className="flex items-center text-sm text-gray-600">
                                <div className="w-2 h-2 bg-green-600 rounded-full ml-2"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button asChild className="bg-green-600 hover:bg-green-700">
                          <Link to={category.link}>
                            {currentLanguage === "العربية" ? "عرض التفاصيل" : 
                             currentLanguage === "English" ? "View Details" : "Voir les détails"}
                            <ArrowLeft className="mr-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Advantages */}
          <section className="mb-12">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                  {currentLanguage === "العربية" ? "لماذا تختار منتجاتنا؟" : 
                   currentLanguage === "English" ? "Why Choose Our Products?" : "Pourquoi choisir nos produits ?"}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {advantages.map((advantage, index) => (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-4">
                        {advantage.icon}
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">{getAdvantageTitle(advantage)}</h4>
                      <p className="text-sm text-gray-600">{getAdvantageDescription(advantage)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Call to Action */}
          <section className="text-center py-12 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {currentLanguage === "العربية" ? "هل تبحث عن منتج معين؟" : 
               currentLanguage === "English" ? "Looking for a specific product?" : "Vous cherchez un produit spécifique ?"}
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              {currentLanguage === "العربية" ? "فريقنا المتخصص جاهز لمساعدتك في العثور على المنتجات المناسبة لاحتياجاتك" : 
               currentLanguage === "English" ? "Our specialized team is ready to help you find the right products for your needs" : 
               "Notre équipe spécialisée est prête à vous aider à trouver les bons produits pour vos besoins"}
            </p>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link to="/contact">
                {currentLanguage === "العربية" ? "تواصل معنا الآن" : 
                 currentLanguage === "English" ? "Contact Us Now" : "Contactez-nous maintenant"}
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Products;
