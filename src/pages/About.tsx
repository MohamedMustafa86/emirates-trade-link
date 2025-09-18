import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Users, Award, Home, Grid3X3, MessageCircle, User } from "lucide-react";
import Header from "@/components/Header";
import { getTranslation } from "@/utils/translations";
import { useLanguage } from "@/hooks/useLanguage";

const About = () => {
  const { currentLanguage, handleLanguageChange } = useLanguage();

  const gccCountries = [
    { ar: "دولة الإمارات العربية المتحدة", en: "United Arab Emirates", fr: "Émirats arabes unis" },
    { ar: "المملكة العربية السعودية", en: "Saudi Arabia", fr: "Arabie saoudite" },
    { ar: "سلطنة عمان", en: "Sultanate of Oman", fr: "Sultanat d'Oman" },
    { ar: "دولة الكويت", en: "State of Kuwait", fr: "État du Koweït" },
    { ar: "دولة قطر", en: "State of Qatar", fr: "État du Qatar" },
    { ar: "مملكة البحرين", en: "Kingdom of Bahrain", fr: "Royaume de Bahreïn" }
  ];

  const africanCountries = [
    { ar: "جمهورية مصر العربية", en: "Arab Republic of Egypt", fr: "République arabe d'Égypte" },
    { ar: "جمهورية جنوب إفريقيا", en: "Republic of South Africa", fr: "République d'Afrique du Sud" },
    { ar: "جمهورية نيجيريا الاتحادية", en: "Federal Republic of Nigeria", fr: "République fédérale du Nigeria" },
    { ar: "جمهورية كينيا", en: "Republic of Kenya", fr: "République du Kenya" },
    { ar: "المملكة المغربية", en: "Kingdom of Morocco", fr: "Royaume du Maroc" }
  ];

  const middleEastCountries = [
    { ar: "الجمهورية اللبنانية", en: "Lebanese Republic", fr: "République libanaise" },
    { ar: "الجمهورية العراقية", en: "Republic of Iraq", fr: "République d'Irak" },
    { ar: "الجمهورية الإسلامية الإيرانية", en: "Islamic Republic of Iran", fr: "République islamique d'Iran" },
    { ar: "جمهورية تركيا", en: "Republic of Turkey", fr: "République de Turquie" },
    { ar: "المملكة الأردنية الهاشمية", en: "Hashemite Kingdom of Jordan", fr: "Royaume hachémite de Jordanie" }
  ];

  const getCountryName = (country: any) => {
    return currentLanguage === "العربية" ? country.ar : 
           currentLanguage === "English" ? country.en : country.fr;
  };

  return (
    <div 
      className="relative flex min-h-screen flex-col bg-gray-50" 
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
            <h1 className="text-4xl font-bold mb-4">{getTranslation("aboutUsTitle", currentLanguage)}</h1>
            <p className="text-xl max-w-3xl mx-auto">
              {getTranslation("aboutUsHero", currentLanguage)}
            </p>
          </section>

          {/* Company Background */}
          <section className="mb-12">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">{getTranslation("companyBackground", currentLanguage)}</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {getTranslation("companyBackgroundText1", currentLanguage)}
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {getTranslation("companyBackgroundText2", currentLanguage)}
                    </p>
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                      <Link to="/contact">
                        {getTranslation("contactUs", currentLanguage)}
                        <ArrowRight className="mr-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div>
                    <img 
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" 
                      alt="UAE Business" 
                      className="w-full h-80 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Vision & Mission */}
          <section className="mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-green-200">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Eye className="h-8 w-8 text-green-600 ml-3" />
                    <h3 className="text-2xl font-bold text-gray-800">{getTranslation("vision", currentLanguage)}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {getTranslation("visionText", currentLanguage)}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Target className="h-8 w-8 text-green-600 ml-3" />
                    <h3 className="text-2xl font-bold text-gray-800">{getTranslation("mission", currentLanguage)}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {getTranslation("missionText", currentLanguage)}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Leadership Profile */}
          <section className="mb-12">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{getTranslation("leadership", currentLanguage)}</h2>
                <div className="max-w-4xl mx-auto">
                  <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="text-center">
                      <img 
                        src="/lovable-uploads/founder-image.jpg" 
                        alt={getTranslation("founderName", currentLanguage)} 
                        className="w-48 h-48 object-cover rounded-full mx-auto mb-4 shadow-lg"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{getTranslation("founderName", currentLanguage)}</h3>
                      <p className="text-green-600 font-semibold mb-4">{getTranslation("founderTitle", currentLanguage)}</p>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {getTranslation("founderDescription", currentLanguage)}
                      </p>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-green-600 ml-2" />
                        <span className="text-gray-600">{getTranslation("experienceYears", currentLanguage)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Target Markets */}
          <section className="mb-12">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{getTranslation("targetMarketsTitle", currentLanguage)}</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">{getTranslation("gccCountries", currentLanguage)}</h4>
                    <ul className="space-y-2 text-gray-600">
                      {gccCountries.map((country, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-green-600 rounded-full ml-3"></div>
                          {getCountryName(country)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">{getTranslation("africanMarkets", currentLanguage)}</h4>
                    <ul className="space-y-2 text-gray-600">
                      {africanCountries.map((country, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full ml-3"></div>
                          {getCountryName(country)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">{getTranslation("middleEastMarkets", currentLanguage)}</h4>
                    <ul className="space-y-2 text-gray-600">
                      {middleEastCountries.map((country, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full ml-3"></div>
                          {getCountryName(country)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Awards & Certifications */}
          <section className="mb-12">
            <Card>
              <CardContent className="p-8">
                <div className="text-center">
                  <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">{getTranslation("certificationsTitle", currentLanguage)}</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">{getTranslation("exportLicense", currentLanguage)}</h4>
                      <p className="text-sm text-gray-600">{getTranslation("exportLicenseDesc", currentLanguage)}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">{getTranslation("isoQuality", currentLanguage)}</h4>
                      <p className="text-sm text-gray-600">{getTranslation("isoQualityDesc", currentLanguage)}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">{getTranslation("businessCouncil", currentLanguage)}</h4>
                      <p className="text-sm text-gray-600">{getTranslation("businessCouncilDesc", currentLanguage)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>

      {/* Bottom Navigation */}
      <div className="flex gap-2 border-t border-[#f0f2f4] bg-white px-4 pb-3 pt-2">
        <Link to="/" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#637488]">
          <div className="text-[#637488] flex h-8 items-center justify-center">
            <Home className="h-6 w-6" />
          </div>
          <p className="text-[#637488] text-xs font-medium leading-normal tracking-[0.015em]">{getTranslation("home", currentLanguage)}</p>
        </Link>
        <Link to="/products" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#637488]">
          <div className="text-[#637488] flex h-8 items-center justify-center">
            <Grid3X3 className="h-6 w-6" />
          </div>
          <p className="text-[#637488] text-xs font-medium leading-normal tracking-[0.015em]">{getTranslation("categories", currentLanguage)}</p>
        </Link>
        <Link to="/messages" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#637488]">
          <div className="text-[#637488] flex h-8 items-center justify-center">
            <MessageCircle className="h-6 w-6" />
          </div>
          <p className="text-[#637488] text-xs font-medium leading-normal tracking-[0.015em]">{getTranslation("messages", currentLanguage)}</p>
        </Link>
        <Link to="/supplier-dashboard" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#637488]">
          <div className="text-[#637488] flex h-8 items-center justify-center">
            <User className="h-6 w-6" />
          </div>
          <p className="text-[#637488] text-xs font-medium leading-normal tracking-[0.015em]">{getTranslation("profile", currentLanguage)}</p>
        </Link>
      </div>
    </div>
  );
};

export default About;
