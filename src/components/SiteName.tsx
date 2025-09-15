import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/utils/translations";

interface SiteNameProps {
  className?: string;
}

const SiteName = ({ className = "" }: SiteNameProps) => {
  const { currentLanguage } = useLanguage();
  
  return (
    <span className={className}>
      {getTranslation("siteName", currentLanguage)}
    </span>
  );
};

export default SiteName;