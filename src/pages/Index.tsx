import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

// Firebase imports
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

// Translations object for multilingual support
const translations = {
  en: {
    heroTitle: "UAE B2B Hub",
    heroSubtitle: "Connecting businesses in the UAE through a trusted and modern platform.",
    registerSupplier: "Register as a Supplier",
    howItWorks: "How It Works",
    step1Title: "Register & Verify",
    step1Desc: "Create your business profile and get verified by our team to ensure trust and credibility.",
    step2Title: "List Products/Services",
    step2Desc: "Showcase your products and services to a wide audience of potential buyers across the UAE.",
    step3Title: "Connect & Transact",
    step3Desc: "Engage with other businesses, negotiate deals, and complete secure transactions seamlessly.",
    platformFeatures: "Platform Features",
    feature1: "Verified Business Profiles: Ensuring trustworthiness and credibility for all members.",
    feature2: "Advanced Product & Supplier Search: Find exactly what you need quickly with powerful filters.",
    feature3: "Secure Messaging System: Communicate safely and directly with other businesses within the platform.",
    feature4: "User Dashboard with Analytics: Gain valuable insights into your activity and performance metrics.",
    feature5: "Product Listings with Ratings: Build reputation and make informed decisions based on peer reviews.",
    feature6: "Secure Transactions Integration: Facilitate safe and efficient dealings with integrated payment solutions.",
    supplierRegistration: "Register as a Supplier",
    supplierRegistrationDesc: "Join our growing network of verified businesses. Fill out the form below to get started and unlock new opportunities!",
    companyName: "Company Name (e.g., ABC Trading LLC)",
    emailAddress: "Email Address (e.g., contact@abctrading.com)",
    phoneNumber: "Phone Number (e.g., +971 50 123 4567)",
    websiteURL: "Website URL (Optional, e.g., www.abctrading.com)",
    businessDescription: "Business Description (e.g., industry, main products, target market, company size)",
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
    dashboard: "Your Personalized Dashboard",
    supplierView: "Supplier View",
    buyerView: "Buyer View",
    analyticsView: "Analytics & Reports",
    welcomeSupplier: "Welcome, Supplier!",
    supplierDashboardDesc: "From here, you can efficiently manage your business operations on the UAE B2B Hub.",
    manageListings: "Manage Product Listings",
    respondInquiries: "Respond to Buyer Inquiries",
    trackOrders: "Track Orders and Ratings",
    goToSupplierPanel: "Go to Supplier Panel",
    welcomeBuyer: "Welcome, Buyer!",
    buyerDashboardDesc: "Explore a vast network of verified suppliers and streamline your procurement process with ease.",
    browseSuppliers: "Browse Verified Suppliers",
    sendInquiries: "Send Product Inquiries",
    manageOrders: "Manage Orders and Reviews",
    goToBuyerPanel: "Go to Buyer Panel",
    analyticsTitle: "Business Analytics & Reports",
    analyticsDesc: "View detailed reports and insights from your business operations. (Data from MongoDB via Backend API)",
    loadingAnalytics: "Loading analytics data...",
    fetchAnalyticsError: "Error fetching analytics data:",
    sampleReport: "Sample Report:",
    totalSales: "Total Sales:",
    topProduct: "Top Product:",
    customerGrowth: "Customer Growth:",
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
    heroTitle: "مركز الإمارات للأعمال B2B",
    heroSubtitle: "ربط الشركات في الإمارات العربية المتحدة عبر منصة موثوقة وحديثة.",
    registerSupplier: "سجل كمورد",
    howItWorks: "كيف تعمل المنصة",
    step1Title: "سجل وتحقق",
    step1Desc: "أنشئ ملف تعريف عملك واحصل على التحقق من فريقنا لضمان الثقة والمصداقية.",
    step2Title: "اعرض المنتجات/الخدمات",
    step2Desc: "اعرض منتجاتك وخدماتك لجمهور واسع من المشترين المحتملين في جميع أنحاء الإمارات.",
    step3Title: "تواصل وتعامل",
    step3Desc: "تفاعل مع الشركات الأخرى، تفاوض على الصفقات، وأكمل المعاملات الآمنة بسلاسة.",
    platformFeatures: "ميزات المنصة",
    feature1: "ملفات تعريف الأعمال الموثقة: لضمان الجدارة بالثقة والمصداقية لجميع الأعضاء.",
    feature2: "بحث متقدم عن المنتجات والموردين: اعثر على ما تحتاجه بسرعة باستخدام فلاتر قوية.",
    feature3: "نظام مراسلة آمن: تواصل بأمان ومباشرة مع الشركات الأخرى داخل المنصة.",
    feature4: "لوحة تحكم المستخدم مع التحليلات: احصل على رؤى قيمة حول نشاطك ومقاييس الأداء.",
    feature5: "قوائم المنتجات مع التقييمات: ابنِ سمعتك واتخذ قرارات مستنيرة بناءً على مراجعات الأقران.",
    feature6: "تكامل المعاملات الآمنة: لتسهيل التعاملات الآمنة والفعالة مع حلول الدفع المتكاملة.",
    supplierRegistration: "سجل كمورد",
    supplierRegistrationDesc: "انضم إلى شبكتنا المتنامية من الشركات الموثقة. املأ النموذج أدناه للبدء وافتح فرصًا جديدة!",
    companyName: "اسم الشركة (مثال: شركة ABC التجارية ذ.م.م)",
    emailAddress: "عنوان البريد الإلكتروني (مثال: contact@abctrading.com)",
    phoneNumber: "رقم الهاتف (مثال: +971 50 123 4567)",
    websiteURL: "رابط الموقع الإلكتروني (اختياري، مثال: www.abctrading.com)",
    businessDescription: "وصف العمل (مثال: الصناعة، المنتجات الرئيسية، السوق المستهدف، حجم الشركة)",
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
    dashboard: "لوحة التحكم المخصصة لك",
    supplierView: "عرض المورد",
    buyerView: "عرض المشتري",
    analyticsView: "التحليلات والتقارير",
    welcomeSupplier: "أهلاً بك أيها المورد!",
    supplierDashboardDesc: "من هنا، يمكنك إدارة عمليات عملك بكفاءة على مركز الإمارات للأعمال B2B.",
    manageListings: "إدارة قوائم المنتجات",
    respondInquiries: "الرد على استفسارات المشترين",
    trackOrders: "تتبع الطلبات والتقييمات",
    goToSupplierPanel: "اذهب إلى لوحة تحكم المورد",
    welcomeBuyer: "أهلاً بك أيها المشتري!",
    buyerDashboardDesc: "استكشف شبكة واسعة من الموردين الموثقين وقم بتبسيط عملية الشراء الخاصة بك بسهولة.",
    browseSuppliers: "تصفح الموردين الموثقين",
    sendInquiries: "إرسال استفسارات المنتجات",
    manageOrders: "إدارة الطلبات والمراجعات",
    goToBuyerPanel: "اذهب إلى لوحة تحكم المشتري",
    analyticsTitle: "تحليلات وتقارير الأعمال",
    analyticsDesc: "عرض التقارير والرؤى التفصيلية من عمليات عملك. (البيانات من MongoDB عبر واجهة برمجة تطبيقات الواجهة الخلفية)",
    loadingAnalytics: "جارٍ تحميل بيانات التحليلات...",
    fetchAnalyticsError: "خطأ في جلب بيانات التحليلات:",
    sampleReport: "تقرير عينة:",
    totalSales: "إجمالي المبيعات:",
    topProduct: "المنتج الأكثر مبيعًا:",
    customerGrowth: "نمو العملاء:",
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 p-4">
        <Card className="w-full max-w-md p-8 shadow-2xl rounded-lg bg-white">
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
    <main className="min-h-screen bg-gray-50 p-8 space-y-12 font-inter" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Language Toggle Button */}
      <Button
        onClick={toggleLocale}
        className="fixed top-4 left-4 bg-blue-600 text-white hover:bg-blue-700 rounded-full px-4 py-2 text-sm shadow-md z-50"
      >
        {locale === 'en' ? 'العربية' : 'English'}
      </Button>

      {/* PRD Link Button */}
      <Button
        onClick={() => window.open('/prd', '_blank')}
        className="fixed top-16 left-4 bg-green-600 text-white hover:bg-green-700 rounded-full px-4 py-2 text-sm shadow-md z-50"
      >
        View PRD
      </Button>

      {/* User ID and Logout Button */}
      {userId && (
        <div className="fixed top-4 right-4 flex items-center space-x-2 bg-blue-100 text-blue-800 p-2 rounded-md text-sm shadow-md z-50">
          <span className="flex items-center">
            {t.userId} <span className="font-mono font-semibold mx-1">{userId.substring(0, 8)}...</span>
          </span>
          <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs">
            {t.logout}
          </Button>
        </div>
      )}

      {/* Hero Section */}
      <section className="text-center py-20 bg-blue-700 text-white rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold mb-4">{t.heroTitle}</h1>
        <p className="text-xl mb-8">
          {t.heroSubtitle}
        </p>
        <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-semibold shadow-md transition-all duration-300 ease-in-out hover:scale-105">
          {t.registerSupplier}
        </Button>
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">{t.howItWorks}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: t.step1Title, desc: t.step1Desc },
            { title: t.step2Title, desc: t.step2Desc },
            { title: t.step3Title, desc: t.step3Desc },
          ].map((step, i) => (
            <Card key={i} className="text-center shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
              <CardContent className="p-8">
                <div className="text-blue-600 text-4xl font-bold mb-4">0{i + 1}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-700">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white rounded-lg shadow-md">
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
            <li key={i} className="flex items-start space-x-3 bg-gray-50 p-4 rounded-md shadow-sm border border-gray-100 hover:border-blue-300 transition-colors duration-200"
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
      <section className="bg-blue-600 p-10 rounded-xl shadow-lg text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">{t.supplierRegistration}</h2>
        <p className="text-center mb-8 text-blue-100">
          {t.supplierRegistrationDesc}
        </p>
        <form onSubmit={handleRegistrationSubmit} className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <Input
            placeholder={t.companyName}
            className="bg-white text-gray-900 border-none p-3 rounded-md focus:ring-2 focus:ring-blue-300"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
          <Input
            placeholder={t.emailAddress}
            type="email"
            className="bg-white text-gray-900 border-none p-3 rounded-md focus:ring-2 focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder={t.phoneNumber}
            className="bg-white text-gray-900 border-none p-3 rounded-md focus:ring-2 focus:ring-blue-300"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <Input
            placeholder={t.websiteURL}
            className="bg-white text-gray-900 border-none p-3 rounded-md focus:ring-2 focus:ring-blue-300"
            value={websiteURL}
            onChange={(e) => setWebsiteURL(e.target.value)}
          />
          <Textarea
            placeholder={t.businessDescription}
            className="md:col-span-2 bg-white text-gray-900 border-none p-3 rounded-md min-h-[120px] focus:ring-2 focus:ring-blue-300"
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
            required
          />
          <Button
            type="submit"
            className="md:col-span-2 bg-white text-blue-700 hover:bg-gray-100 text-lg font-semibold py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
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
      </section>

      {/* Contact & Chat Section */}
      <section className="space-y-6 py-12 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">{t.contactUs}</h2>
        <div className="flex flex-col space-y-4 p-4 border border-gray-200 rounded-lg max-w-2xl mx-auto shadow-sm bg-gray-50">
          <div className="flex-1 h-64 overflow-y-auto border border-gray-200 rounded-md p-4 bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {messages.length === 0 ? (
              <p className="text-center text-gray-500">{t.startChat}</p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.senderId === userId ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${msg.senderId === userId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
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
            <Avatar className="h-12 w-12 border-2 border-blue-500 flex-shrink-0" />
            <Input
              className="flex-1 p-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200"
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
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              {t.send}
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-12 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">{t.dashboard}</h2>
        <Tabs defaultValue="supplier" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 bg-blue-100 rounded-lg p-1 shadow-inner">
            <TabsTrigger value="supplier" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md text-lg px-6 py-2 font-semibold transition-colors duration-200">
              {t.supplierView}
            </TabsTrigger>
            <TabsTrigger value="buyer" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md text-lg px-6 py-2 font-semibold transition-colors duration-200">
              {t.buyerView}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md text-lg px-6 py-2 font-semibold transition-colors duration-200" onClick={fetchAnalytics}>
              {t.analyticsView}
            </TabsTrigger>
          </TabsList>
          {/* Content for the Supplier View tab */}
          <TabsContent value="supplier">
            <Card className="mt-6 border-blue-400 border-2 shadow-lg rounded-lg">
              <CardContent className="p-8 space-y-6">
                <h3 className="text-2xl font-bold text-blue-700">{t.welcomeSupplier}</h3>
                <p className="text-gray-700">
                  {t.supplierDashboardDesc}
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Easily <span className="font-semibold text-blue-600">{t.manageListings}</span> and update your offerings to attract more buyers.</li>
                  <li><span className="font-semibold text-blue-600">{t.respondInquiries}</span> promptly to secure new deals and build strong relationships.</li>
                  <li><span className="font-semibold text-blue-600">{t.trackOrders}</span> to monitor your performance and enhance your reputation on the platform.</li>
                </ul>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
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
  );
}
