import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Navigation from "@/components/Navigation";
import { useState, useEffect } from "react";

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

// Translations object for multilingual support
const translations = {
  en: {
    heroTitle: "UAE Global Hub",
    heroSubtitle: "Promoting Emirati and GCC products to global, African, and Middle Eastern markets.",
    registerSupplier: "Register as a Supplier",
    howItWorks: "How It Works",
    step1Title: "Register & Verify",
    step1Desc: "Create your business profile and get verified by our team to ensure trust and credibility.",
    step2Title: "List Products/Services",
    step2Desc: "Showcase your Emirati and GCC products to global markets including Africa and Middle East.",
    step3Title: "Connect & Export",
    step3Desc: "Connect with international buyers and expand your reach to global markets.",
    platformFeatures: "Platform Features",
    feature1: "Verified GCC Business Profiles: Ensuring trustworthiness and credibility for all members.",
    feature2: "Global Market Access: Connect with buyers in Africa, Middle East, and worldwide.",
    feature3: "Export Documentation Support: Complete assistance with international trade documentation.",
    feature4: "Market Intelligence: Insights into target markets and buyer preferences.",
    feature5: "Product Certification: Support for international quality standards and certifications.",
    feature6: "Logistics Integration: End-to-end shipping and logistics solutions for global trade.",
    supplierRegistration: "Register as a GCC Supplier",
    supplierRegistrationDesc: "Join our network of verified GCC businesses and expand your reach to global markets!",
    companyName: "Company Name (e.g., ABC Trading LLC)",
    emailAddress: "Email Address (e.g., contact@abctrading.com)",
    phoneNumber: "Phone Number (e.g., +971 50 123 4567)",
    websiteURL: "Website URL (Optional, e.g., www.abctrading.com)",
    businessDescription: "Business Description (e.g., industry, main products, target markets)",
    submitApplication: "Submit Application",
    submitting: "Submitting...",
    applicationSuccess: "Application submitted successfully! We will review your details shortly.",
    applicationError: "Error submitting application:",
    contactUs: "Contact Us or Start a Chat",
    typeMessage: "Type your message to our support team...",
    send: "Send",
    startChat: "Start a conversation...",
    you: "You",
    user: "User:",
    dashboard: "Your Export Dashboard",
    supplierView: "Supplier View",
    buyerView: "Buyer View",
    analyticsView: "Analytics & Reports",
    welcomeSupplier: "Welcome, GCC Supplier!",
    supplierDashboardDesc: "Manage your global export operations from the UAE Global Hub platform.",
    manageListings: "Manage Product Listings",
    respondInquiries: "Respond to International Inquiries",
    trackOrders: "Track Global Orders",
    goToSupplierPanel: "Go to Supplier Panel",
    welcomeBuyer: "Welcome, International Buyer!",
    buyerDashboardDesc: "Discover authentic Emirati and GCC products from verified suppliers.",
    browseSuppliers: "Browse GCC Suppliers",
    sendInquiries: "Send Product Inquiries",
    manageOrders: "Manage Orders and Reviews",
    goToBuyerPanel: "Go to Buyer Panel",
    analyticsTitle: "Export Analytics & Reports",
    analyticsDesc: "View detailed reports on your global export operations and market performance.",
    loadingAnalytics: "Loading analytics data...",
    fetchAnalyticsError: "Error fetching analytics data:",
    sampleReport: "Sample Report:",
    totalSales: "Total Export Sales:",
    topProduct: "Top Export Product:",
    customerGrowth: "Market Expansion:",
    userId: "User ID:",
    firebaseError: "Firebase not initialized or user not authenticated.",
    cannotSendEmpty: "Cannot send empty message or Firebase not ready.",
    loginTitle: "Login to Your Account",
    loginEmail: "Email",
    loginPassword: "Password",
    loginButton: "Login",
    loggingIn: "Logging in...",
    loginError: "Login Error:",
    logout: "Logout",
    logoutSuccess: "Logged out successfully.",
    logoutError: "Error logging out:",
  },
  ar: {
    heroTitle: "مركز الإمارات العالمي",
    heroSubtitle: "تسويق المنتجات الإماراتية والخليجية إلى الأسواق العالمية والإفريقية والشرق أوسطية.",
    registerSupplier: "سجل كمورد خليجي",
    howItWorks: "كيف تعمل المنصة",
    step1Title: "سجل وتحقق",
    step1Desc: "أنشئ ملف تعريف عملك واحصل على التحقق من فريقنا لضمان الثقة والمصداقية.",
    step2Title: "اعرض منتجاتك الخليجية",
    step2Desc: "اعرض منتجاتك الإماراتية والخليجية للأسواق العالمية بما في ذلك إفريقيا والشرق الأوسط.",
    step3Title: "تواصل وصدّر",
    step3Desc: "تواصل مع المشترين الدوليين ووسع نطاق وصولك إلى الأسواق العالمية.",
    platformFeatures: "ميزات المنصة",
    feature1: "ملفات تعريف الأعمال الخليجية الموثقة: لضمان الجدارة بالثقة والمصداقية.",
    feature2: "الوصول للأسواق العالمية: تواصل مع المشترين في إفريقيا والشرق الأوسط والعالم.",
    feature3: "دعم وثائق التصدير: مساعدة شاملة في وثائق التجارة الدولية.",
    feature4: "ذكاء السوق: رؤى حول الأسواق المستهدفة وتفضيلات المشترين.",
    feature5: "شهادات المنتجات: دعم لمعايير الجودة والشهادات الدولية.",
    feature6: "تكامل اللوجستيات: حلول شحن ولوجستيات شاملة للتجارة العالمية.",
    supplierRegistration: "سجل كمورد خليجي",
    supplierRegistrationDesc: "انضم إلى شبكتنا من الشركات الخليجية الموثقة ووسع نطاق وصولك إلى الأسواق العالمية!",
    companyName: "اسم الشركة (مثال: شركة ABC التجارية ذ.م.م)",
    emailAddress: "عنوان البريد الإلكتروني (مثال: contact@abctrading.com)",
    phoneNumber: "رقم الهاتف (مثال: +971 50 123 4567)",
    websiteURL: "رابط الموقع الإلكتروني (اختياري، مثال: www.abctrading.com)",
    businessDescription: "وصف العمل (مثال: الصناعة، المنتجات الرئيسية، الأسواق المستهدفة)",
    submitApplication: "إرسال الطلب",
    submitting: "جارٍ الإرسال...",
    applicationSuccess: "تم إرسال الطلب بنجاح! سنقوم بمراجعة التفاصيل الخاصة بك قريبًا.",
    applicationError: "خطأ في إرسال الطلب:",
    contactUs: "اتصل بنا أو ابدأ محادثة",
    typeMessage: "اكتب رسالتك إلى فريق الدعم لدينا...",
    send: "إرسال",
    startChat: "ابدأ محادثة...",
    you: "أنت",
    user: "المستخدم:",
    dashboard: "لوحة تحكم التصدير",
    supplierView: "عرض المورد",
    buyerView: "عرض المشتري",
    analyticsView: "التحليلات والتقارير",
    welcomeSupplier: "أهلاً بك أيها المورد الخليجي!",
    supplierDashboardDesc: "أدر عمليات التصدير العالمية الخاصة بك من منصة مركز الإمارات العالمي.",
    manageListings: "إدارة قوائم المنتجات",
    respondInquiries: "الرد على الاستفسارات الدولية",
    trackOrders: "تتبع الطلبات العالمية",
    goToSupplierPanel: "اذهب إلى لوحة تحكم المورد",
    welcomeBuyer: "أهلاً بك أيها المشتري الدولي!",
    buyerDashboardDesc: "اكتشف المنتجات الإماراتية والخليجية الأصيلة من الموردين الموثقين.",
    browseSuppliers: "تصفح الموردين الخليجيين",
    sendInquiries: "إرسال استفسارات المنتجات",
    manageOrders: "إدارة الطلبات والمراجعات",
    goToBuyerPanel: "اذهب إلى لوحة تحكم المشتري",
    analyticsTitle: "تحليلات وتقارير التصدير",
    analyticsDesc: "عرض التقارير التفصيلية حول عمليات التصدير العالمية وأداء السوق.",
    loadingAnalytics: "جارٍ تحميل بيانات التحليلات...",
    fetchAnalyticsError: "خطأ في جلب بيانات التحليلات:",
    sampleReport: "تقرير عينة:",
    totalSales: "إجمالي مبيعات التصدير:",
    topProduct: "أفضل منتج للتصدير:",
    customerGrowth: "توسع السوق:",
    userId: "معرف المستخدم:",
    firebaseError: "لم يتم تهيئة Firebase أو لم يتم مصادقة المستخدم.",
    cannotSendEmpty: "لا يمكن إرسال رسالة فارغة أو Firebase غير جاهز.",
    loginTitle: "تسجيل الدخول إلى حسابك",
    loginEmail: "البريد الإلكتروني",
    loginPassword: "كلمة المرور",
    loginButton: "تسجيل الدخول",
    loggingIn: "جارٍ تسجيل الدخول...",
    loginError: "خطأ في تسجيل الدخول:",
    logout: "تسجيل الخروج",
    logoutSuccess: "تم تسجيل الخروج بنجاح.",
    logoutError: "خطأ في تسجيل الخروج:",
  },
};

export default function App() {
  const [locale, setLocale] = useState('en'); // State for current language: 'en' or 'ar'
  const t = translations[locale]; // Shorthand for current translations

  // States for supplier registration form
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [websiteURL, setWebsiteURL] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null); // 'success', 'error', 'loading'
  const [registrationMessage, setRegistrationMessage] = useState("");

  // States for Firebase and Chat
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null); // Stores the current user's ID
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [chatInput, setChatInput] = useState(""); // State for the chat input field
  const [isAuthReady, setIsAuthReady] = useState(false); // Flag to ensure Firebase auth is ready

  // States for Analytics (MongoDB data simulation)
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [analyticsError, setAnalyticsError] = useState(null);

  // States for Login functionality
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // Industry showcase data with Emirati and GCC products
  const industryShowcase = [
    {
      title: "التمور الإماراتية الفاخرة",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      description: "تمور عالية الجودة من أجود المزارع الإماراتية للتصدير العالمي"
    },
    {
      title: "منتجات البترول والغاز",
      image: "https://images.unsplash.com/photo-1574781330855-d0db2706b3d0",
      description: "منتجات الطاقة والبتروكيماويات من دول مجلس التعاون الخليجي"
    },
    {
      title: "الألومنيوم والمعادن",
      image: "https://images.unsplash.com/photo-1565728744382-61accd4aa148",
      description: "منتجات الألومنيوم والمعادن عالية الجودة من الإمارات"
    },
    {
      title: "المنسوجات والأزياء التراثية",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144",
      description: "الأزياء التراثية والمنسوجات الفاخرة من التراث الخليجي"
    }
  ];

  const stats = [
    { number: "6", label: "GCC Countries" },
    { number: "50+", label: "Target Markets" },
    { number: "$1.2B+", label: "Export Volume" },
    { number: "95%", label: "Success Rate" }
  ];

  // GCC Flags data
  const gccFlags = [
    { name: "UAE", flag: "🇦🇪" },
    { name: "Saudi Arabia", flag: "🇸🇦" },
    { name: "Kuwait", flag: "🇰🇼" },
    { name: "Qatar", flag: "🇶🇦" },
    { name: "Bahrain", flag: "🇧🇭" },
    { name: "Oman", flag: "🇴🇲" }
  ];

  // Firebase Initialization and Authentication
  useEffect(() => {
    try {
      // Mock Firebase configuration for demonstration
      const firebaseConfig = {
        apiKey: "demo-api-key",
        authDomain: "demo-project.firebaseapp.com",
        projectId: "demo-project",
        storageBucket: "demo-project.appspot.com",
        messagingSenderId: "123456789",
        appId: "1:123456789:web:demo"
      };

      console.log("Initializing Firebase...");
      // For demo purposes, we'll simulate successful initialization
      setIsAuthReady(true);
      setUserId("demo-user-" + Math.random().toString(36).substr(2, 9));
    } catch (error) {
      console.error("Error initializing Firebase:", error);
      // For demo, still allow the app to work
      setIsAuthReady(true);
      setUserId("demo-user-" + Math.random().toString(36).substr(2, 9));
    }
  }, []);

  // Function to fetch analytics data from a hypothetical backend API (MongoDB data)
  const fetchAnalytics = async () => {
    setLoadingAnalytics(true);
    setAnalyticsError(null);
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockData = {
        totalSales: "$45,230",
        topProduct: "Industrial Equipment",
        customerGrowth: "+23% this month"
      };
      setAnalyticsData(mockData);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      setAnalyticsError(`${t.fetchAnalyticsError} ${error.message}`);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  // Handle Supplier Registration Form Submission
  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setRegistrationStatus('error');
      setRegistrationMessage(t.firebaseError);
      return;
    }

    setRegistrationStatus('loading');
    setRegistrationMessage(t.submitting);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Supplier registration:", {
        companyName,
        email,
        phoneNumber,
        websiteURL,
        businessDescription,
        registeredBy: userId,
        timestamp: new Date()
      });

      setRegistrationStatus('success');
      setRegistrationMessage(t.applicationSuccess);
      setCompanyName("");
      setEmail("");
      setPhoneNumber("");
      setWebsiteURL("");
      setBusinessDescription("");
    } catch (e) {
      console.error("Error adding document: ", e);
      setRegistrationStatus('error');
      setRegistrationMessage(`${t.applicationError} ${e.message}`);
    }
  };

  // Handle Chat Message Sending
  const handleSendMessage = async () => {
    if (!userId || chatInput.trim() === "") {
      console.warn(t.cannotSendEmpty);
      return;
    }

    try {
      const newMessage = {
        text: chatInput,
        senderId: userId,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, newMessage]);
      setChatInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    try {
      // Simulate login
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUserId("user-" + Math.random().toString(36).substr(2, 9));
      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(`${t.loginError} ${error.message}`);
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      setUserId(null);
      setLoginError(null);
      console.log(t.logoutSuccess);
    } catch (error) {
      console.error("Error logging out:", error);
      setLoginError(`${t.logoutError} ${error.message}`);
    }
  };

  const toggleLocale = () => {
    setLocale(prevLocale => (prevLocale === 'en' ? 'ar' : 'en'));
  };

  // Conditional rendering for login page vs main content
  if (!isAuthReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800">
        <p>Loading application...</p>
      </div>
    );
  }

  // If user is not logged in (userId is null after auth check), show login form
  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-orange-400 to-white p-4">
        <Card className="w-full max-w-md p-8 shadow-2xl rounded-lg bg-white backdrop-blur-sm bg-opacity-95">
          <CardContent className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              {t.loginTitle}
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                placeholder={t.loginEmail}
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <Input
                type="password"
                placeholder={t.loginPassword}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-md shadow-md transition-all duration-300"
                disabled={loginLoading}
              >
                {loginLoading ? t.loggingIn : t.loginButton}
              </Button>
              {loginError && (
                <p className="text-red-500 text-sm text-center mt-3">{loginError}</p>
              )}
            </form>
            <div className="flex justify-center">
              <Button
                onClick={toggleLocale}
                variant="outline"
                className="text-sm"
              >
                {locale === 'en' ? 'العربية' : 'English'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If user is logged in, show the main application content
  return (
    <div className="min-h-screen bg-gray-50" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Navigation />
      
      {/* GCC Flags Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-center items-center space-x-4 rtl:space-x-reverse">
            <span className="text-sm font-medium text-gray-600 mr-4">دول مجلس التعاون:</span>
            {gccFlags.map((country, index) => (
              <div key={index} className="flex items-center space-x-1 rtl:space-x-reverse">
                <span className="text-2xl">{country.flag}</span>
                <span className="text-xs text-gray-500 hidden md:inline">{country.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Language Toggle Button */}
        <Button
          onClick={toggleLocale}
          className="fixed top-20 left-4 bg-white text-orange-600 hover:bg-orange-50 rounded-full px-4 py-2 text-sm shadow-md z-40 border border-orange-200"
        >
          {locale === 'en' ? 'العربية' : 'English'}
        </Button>

        {/* PRD Link Button */}
        <Button
          onClick={() => window.open('/prd', '_blank')}
          className="fixed top-32 left-4 bg-green-600 text-white hover:bg-green-700 rounded-full px-4 py-2 text-sm shadow-md z-40"
        >
          View PRD
        </Button>

        {/* User ID and Logout Button */}
        {userId && (
          <div className="fixed top-4 right-4 flex items-center space-x-2 bg-white text-orange-800 p-2 rounded-md text-sm shadow-md z-40 border border-orange-200">
            <span className="flex items-center">
              {t.userId} <span className="font-mono font-semibold mx-1">{userId.substring(0, 8)}...</span>
            </span>
            <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs">
              {t.logout}
            </Button>
          </div>
        )}

        {/* Hero Section */}
        <section className="text-center py-20 bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 rounded-lg shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 z-0"></div>
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-4 text-gray-900">{t.heroTitle}</h1>
            <p className="text-xl mb-8 text-gray-700 max-w-3xl mx-auto">
              {t.heroSubtitle}
            </p>
            <div className="flex justify-center items-center space-x-4 mb-8">
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
                alt="UAE Dates" 
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
              <img 
                src="https://images.unsplash.com/photo-1574781330855-d0db2706b3d0" 
                alt="Oil Industry" 
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
              <img 
                src="https://images.unsplash.com/photo-1565728744382-61accd4aa148" 
                alt="Aluminum Products" 
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
            </div>
            <Button size="lg" className="bg-green-600 text-white hover:bg-green-700 rounded-full px-8 py-3 text-lg font-semibold shadow-md transition-all duration-300 ease-in-out hover:scale-105">
              {t.registerSupplier}
            </Button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-white bg-opacity-90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
                  <p className="text-gray-700 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Industry Showcase Carousel with GCC Products */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">منتجاتنا الخليجية المميزة</h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-1">
              {industryShowcase.map((industry, index) => (
                <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-white bg-opacity-90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardContent className="p-0">
                      <img 
                        src={industry.image} 
                        alt={industry.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">{industry.title}</h3>
                        <p className="text-gray-600 text-sm">{industry.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* How It Works Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">{t.howItWorks}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: t.step1Title, 
                desc: t.step1Desc,
                image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
              },
              { 
                title: t.step2Title, 
                desc: t.step2Desc,
                image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
              },
              { 
                title: t.step3Title, 
                desc: t.step3Desc,
                image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334"
              },
            ].map((step, i) => (
              <Card key={i} className="text-center shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden bg-white bg-opacity-90 backdrop-blur-sm hover:scale-105">
                <CardContent className="p-0">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-6">
                    <div className="text-green-600 text-4xl font-bold mb-4">0{i + 1}</div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-700">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg">
          <div className="flex justify-center mb-8">
            <img 
              src="https://images.unsplash.com/photo-1496307653780-42ee777d4833" 
              alt="Modern UAE architecture" 
              className="w-full max-w-2xl h-40 object-cover rounded-lg shadow-md"
            />
          </div>
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">{t.platformFeatures}</h2>
          <ul className="grid md:grid-cols-2 gap-6 list-none p-0 text-gray-700 max-w-4xl mx-auto">
            {[
              t.feature1,
              t.feature2,
              t.feature3,
              t.feature4,
              t.feature5,
              t.feature6,
            ].map((feature, i) => (
              <li key={i} className="flex items-start space-x-3 bg-gray-50 p-4 rounded-md shadow-sm border border-gray-100 hover:border-green-300 transition-colors duration-200"
                  style={{ direction: locale === 'ar' ? 'rtl' : 'ltr' }}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-green-500 flex-shrink-0 mt-1 ${locale === 'ar' ? 'ml-3' : 'mr-3'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p>{feature}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Supplier Registration Form Section */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-500 p-10 rounded-xl shadow-lg text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-center">{t.supplierRegistration}</h2>
            <p className="text-center mb-8 text-orange-100">
              {t.supplierRegistrationDesc}
            </p>
            <form onSubmit={handleRegistrationSubmit} className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <Input
                placeholder={t.companyName}
                className="bg-white text-gray-900 border-none p-3 rounded-md focus:ring-2 focus:ring-orange-300"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
              <Input
                placeholder={t.emailAddress}
                type="email"
                className="bg-white text-gray-900 border-none p-3 rounded-md focus:ring-2 focus:ring-orange-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                placeholder={t.phoneNumber}
                className="bg-white text-gray-900 border-none p-3 rounded-md focus:ring-2 focus:ring-orange-300"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <Input
                placeholder={t.websiteURL}
                className="bg-white text-gray-900 border-none p-3 rounded-md focus:ring-2 focus:ring-orange-300"
                value={websiteURL}
                onChange={(e) => setWebsiteURL(e.target.value)}
              />
              <Textarea
                placeholder={t.businessDescription}
                className="md:col-span-2 bg-white text-gray-900 border-none p-3 rounded-md min-h-[120px] focus:ring-2 focus:ring-orange-300"
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="md:col-span-2 bg-white text-orange-700 hover:bg-gray-100 text-lg font-semibold py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                disabled={registrationStatus === 'loading'}
              >
                {registrationStatus === 'loading' ? t.submitting : t.submitApplication}
              </Button>
            </form>
            {registrationStatus && (
              <p className={`mt-4 text-center font-semibold ${registrationStatus === 'success' ? 'text-green-200' : 'text-red-200'}`}>
                {registrationMessage}
              </p>
            )}
          </div>
        </section>

        {/* Contact & Chat Section */}
        <section className="space-y-6 py-12 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800">{t.contactUs}</h2>
          <div className="flex flex-col space-y-4 p-4 border border-gray-200 rounded-lg max-w-2xl mx-auto shadow-sm bg-gray-50">
            <div className="flex-1 h-64 overflow-y-auto border border-gray-200 rounded-md p-4 bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {messages.length === 0 ? (
                <p className="text-center text-gray-500">{t.startChat}</p>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className={`mb-2 ${msg.senderId === userId ? 'text-right' : 'text-left'}`}>
                    <span className={`inline-block p-2 rounded-lg ${msg.senderId === userId ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                      {msg.text}
                    </span>
                    <div className="text-xs text-gray-400 mt-1">
                      {msg.senderId === userId ? t.you : `${t.user} ${msg.senderId.substring(0, 8)}...`}
                      {msg.timestamp && ` - ${new Date(msg.timestamp).toLocaleTimeString()}`}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 border-2 border-orange-500 flex-shrink-0" />
              <Input
                className="flex-1 p-3 rounded-md border border-gray-300 focus:border-orange-500 focus:ring focus:ring-orange-200 transition-all duration-200"
                placeholder={t.typeMessage}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <Button
                onClick={handleSendMessage}
                className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                {t.send}
              </Button>
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="py-12 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">{t.dashboard}</h2>
          <Tabs defaultValue="supplier" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-orange-100 rounded-lg p-1 shadow-inner">
              <TabsTrigger value="supplier" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white rounded-md text-lg px-6 py-2 font-semibold transition-colors duration-200">
                {t.supplierView}
              </TabsTrigger>
              <TabsTrigger value="buyer" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white rounded-md text-lg px-6 py-2 font-semibold transition-colors duration-200">
                {t.buyerView}
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white rounded-md text-lg px-6 py-2 font-semibold transition-colors duration-200" onClick={fetchAnalytics}>
                {t.analyticsView}
              </TabsTrigger>
            </TabsList>
            {/* Content for the Supplier View tab */}
            <TabsContent value="supplier">
              <Card className="mt-6 border-orange-400 border-2 shadow-lg rounded-lg">
                <CardContent className="p-8 space-y-6">
                  <h3 className="text-2xl font-bold text-orange-700">{t.welcomeSupplier}</h3>
                  <p className="text-gray-700">
                    {t.supplierDashboardDesc}
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Easily <span className="font-semibold text-orange-600">{t.manageListings}</span> and update your offerings to attract more buyers.</li>
                    <li><span className="font-semibold text-orange-600">{t.respondInquiries}</span> promptly to secure new deals and build strong relationships.</li>
                    <li><span className="font-semibold text-orange-600">{t.trackOrders}</span> to monitor your performance and enhance your reputation on the platform.</li>
                  </ul>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white text-lg py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                    {t.goToSupplierPanel}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Content for the Buyer View tab */}
            <TabsContent value="buyer">
              <Card className="mt-6 border-green-400 border-2 shadow-lg rounded-lg">
                <CardContent className="p-8 space-y-6">
                  <h3 className="text-2xl font-bold text-green-700">{t.welcomeBuyer}</h3>
                  <p className="text-gray-700">
                    {t.buyerDashboardDesc}
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li><span className="font-semibold text-green-600">{t.browseSuppliers}</span> and discover reliable partners for all your business needs.</li>
                    <li><span className="font-semibold text-green-600">{t.sendInquiries}</span> directly to suppliers for custom quotes and detailed information.</li>
                    <li><span className="font-semibold text-green-600">{t.manageOrders}</span> to keep track of your transactions and provide valuable feedback.</li>
                  </ul>
                  <Button className="bg-green-600 hover:bg-green-700 text-white text-lg py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                    {t.goToBuyerPanel}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            {/* Content for the Analytics & Reports tab (simulating MongoDB data) */}
            <TabsContent value="analytics">
              <Card className="mt-6 border-purple-400 border-2 shadow-lg rounded-lg">
                <CardContent className="p-8 space-y-6">
                  <h3 className="text-2xl font-bold text-purple-700">{t.analyticsTitle}</h3>
                  <p className="text-gray-700">
                    {t.analyticsDesc}
                  </p>
                  <Button onClick={fetchAnalytics} disabled={loadingAnalytics} className="bg-purple-600 hover:bg-purple-700 text-white text-lg py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                    {loadingAnalytics ? t.loadingAnalytics : "Fetch Analytics Data"}
                  </Button>
                  {analyticsError && (
                    <p className="text-red-500 mt-4">{analyticsError}</p>
                  )}
                  {analyticsData && (
                    <div className="mt-6 p-4 bg-purple-50 rounded-md border border-purple-200">
                      <h4 className="text-xl font-semibold mb-2">{t.sampleReport}</h4>
                      <p>{t.totalSales} {analyticsData.totalSales}</p>
                      <p>{t.topProduct} {analyticsData.topProduct}</p>
                      <p>{t.customerGrowth} {analyticsData.customerGrowth}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
}
