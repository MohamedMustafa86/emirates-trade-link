
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import RegistrationDialog from "@/components/RegistrationDialog";
import SupplierRegistrationDialog from "@/components/SupplierRegistrationDialog";
import { getTranslation } from "@/utils/translations";

interface CTASectionProps {
  currentLanguage: string;
}

const CTASection = ({ currentLanguage }: CTASectionProps) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">
          {getTranslation("ctaTitle", currentLanguage)}
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-700 leading-relaxed">
          {getTranslation("ctaDesc", currentLanguage)}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <RegistrationDialog>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
              {getTranslation("registerBuyers", currentLanguage)}
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
          </RegistrationDialog>
          <SupplierRegistrationDialog>
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white">
              {getTranslation("registerSuppliers", currentLanguage)}
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
          </SupplierRegistrationDialog>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
