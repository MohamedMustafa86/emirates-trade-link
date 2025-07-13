
import { useState, useEffect } from 'react';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Try to get saved language from localStorage, default to Arabic
    const savedLanguage = localStorage.getItem('preferred-language');
    return savedLanguage || 'العربية';
  });

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    
    // Save to localStorage
    localStorage.setItem('preferred-language', language);
    
    console.log(`Language changed to: ${language}`);
    
    // Update document direction and language properly
    const body = document.body;
    const html = document.documentElement;
    
    if (language === "العربية") {
      body.dir = "rtl";
      html.dir = "rtl";
      html.lang = "ar";
      body.style.direction = "rtl";
      // Add RTL class for enhanced styling
      body.classList.add('rtl');
      body.classList.remove('ltr');
    } else {
      body.dir = "ltr";
      html.dir = "ltr";
      body.style.direction = "ltr";
      html.lang = language === "English" ? "en" : "fr";
      // Add LTR class for enhanced styling
      body.classList.add('ltr');
      body.classList.remove('rtl');
    }
    
    // Force a re-render by updating a CSS custom property
    document.documentElement.style.setProperty('--text-direction', language === "العربية" ? 'rtl' : 'ltr');
    
    // Force re-render of all components by dispatching a custom event
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language } }));
  };

  // Apply language settings on component mount
  useEffect(() => {
    handleLanguageChange(currentLanguage);
  }, []);

  return {
    currentLanguage,
    handleLanguageChange
  };
};
