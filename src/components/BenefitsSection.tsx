
import { Users, Shield, Truck } from "lucide-react";
import { getTranslation } from "@/utils/translations";

interface BenefitsSectionProps {
  currentLanguage: string;
}

const BenefitsSection = ({ currentLanguage }: BenefitsSectionProps) => {
  const benefits = [
    {
      title: getTranslation("globalMarkets", currentLanguage),
      description: getTranslation("globalMarketsDesc", currentLanguage),
      icon: <Users className="h-6 w-6 text-[#111418]" />
    },
    {
      title: getTranslation("secureTransactions", currentLanguage),
      description: getTranslation("secureTransactionsDesc", currentLanguage),
      icon: <Shield className="h-6 w-6 text-[#111418]" />
    },
    {
      title: getTranslation("efficientLogistics", currentLanguage),
      description: getTranslation("efficientLogisticsDesc", currentLanguage),
      icon: <Truck className="h-6 w-6 text-[#111418]" />
    }
  ];

  return (
    <section className="py-8">
      <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3">
        {getTranslation("platformBenefits", currentLanguage)}
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-1 gap-3 rounded-lg border border-[#dce0e5] bg-white p-4 flex-col">
            <div className="text-[#111418]">
              {benefit.icon}
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-[#111418] text-base font-bold leading-tight">{benefit.title}</h2>
              <p className="text-[#637488] text-sm font-normal leading-normal">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitsSection;
