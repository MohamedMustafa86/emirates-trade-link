
import { Card, CardContent } from "@/components/ui/card";
import { Users, Package, Globe, TrendingUp } from "lucide-react";
import { getTranslation } from "@/utils/translations";

interface StatsSectionProps {
  currentLanguage: string;
}

const StatsSection = ({ currentLanguage }: StatsSectionProps) => {
  const stats = [
    { number: "500+", label: getTranslation("verifiedSuppliers", currentLanguage), icon: <Users className="h-8 w-8 text-emerald-600" /> },
    { number: "10,000+", label: getTranslation("availableProducts", currentLanguage), icon: <Package className="h-8 w-8 text-emerald-600" /> },
    { number: "50+", label: getTranslation("targetCountries", currentLanguage), icon: <Globe className="h-8 w-8 text-emerald-600" /> },
    { number: "95%", label: getTranslation("customerSatisfaction", currentLanguage), icon: <TrendingUp className="h-8 w-8 text-emerald-600" /> }
  ];

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow bg-white border-0">
              <CardContent className="p-0">
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                <p className="text-gray-600 text-lg">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
