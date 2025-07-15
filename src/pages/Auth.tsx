import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    countryCode: '+971',
    location: '',
    userType: 'buyer' as 'buyer' | 'supplier'
  });

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password
      });

      if (error) {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمة المرور غير متطابقة",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: signupData.name,
            phone: `${signupData.countryCode}${signupData.phone}`,
            location: signupData.location,
            user_type: signupData.userType
          }
        }
      });

      if (error) {
        console.log("Registration error:", error);
        if (error.message.includes('already registered')) {
          toast({
            title: "خطأ",
            description: "البريد الإلكتروني مسجل مسبقاً",
            variant: "destructive"
          });
        } else {
          toast({
            title: "خطأ في التسجيل",
            description: `${error.message}`,
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "تم التسجيل بنجاح",
          description: "يرجى تفعيل حسابك من البريد الإلكتروني",
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة للرئيسية
          </Link>
          <img 
            src="/lovable-uploads/8b27315a-9e7d-4683-a231-655339f73994.png" 
            alt="DUBAIMERX.COM Logo" 
            className="h-12 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900">مرحباً بك في دبي ميركس</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">تسجيل الدخول أو إنشاء حساب</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
                <TabsTrigger value="signup">إنشاء حساب</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">البريد الإلكتروني</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">كلمة المرور</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="أدخل كلمة المرور"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      dir="ltr"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button 
                  onClick={handleLogin} 
                  className="w-full" 
                  disabled={isLoading || !loginData.email || !loginData.password}
                >
                  {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </Button>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">الاسم الكامل</Label>
                  <Input
                    id="signup-name"
                    placeholder="أدخل اسمك الكامل"
                    value={signupData.name}
                    onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">البريد الإلكتروني</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-phone">رقم الهاتف</Label>
                  <div className="flex gap-2">
                    <select 
                      className="w-24 h-10 border border-gray-300 rounded-md px-2 text-sm"
                      value={signupData.countryCode || '+971'}
                      onChange={(e) => setSignupData({...signupData, countryCode: e.target.value})}
                    >
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+966">🇸🇦 +966</option>
                      <option value="+965">🇰🇼 +965</option>
                      <option value="+973">🇧🇭 +973</option>
                      <option value="+974">🇶🇦 +974</option>
                      <option value="+968">🇴🇲 +968</option>
                      <option value="+20">🇪🇬 +20</option>
                      <option value="+962">🇯🇴 +962</option>
                      <option value="+961">🇱🇧 +961</option>
                      <option value="+963">🇸🇾 +963</option>
                      <option value="+964">🇮🇶 +964</option>
                      <option value="+967">🇾🇪 +967</option>
                      <option value="+212">🇲🇦 +212</option>
                      <option value="+213">🇩🇿 +213</option>
                      <option value="+216">🇹🇳 +216</option>
                      <option value="+218">🇱🇾 +218</option>
                      <option value="+249">🇸🇩 +249</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+39">🇮🇹 +39</option>
                      <option value="+34">🇪🇸 +34</option>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+86">🇨🇳 +86</option>
                      <option value="+81">🇯🇵 +81</option>
                    </select>
                    <Input
                      id="signup-phone"
                      placeholder="123456789"
                      value={signupData.phone}
                      onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                      dir="ltr"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-location">الموقع</Label>
                  <Input
                    id="signup-location"
                    placeholder="المدينة، البلد"
                    value={signupData.location}
                    onChange={(e) => setSignupData({...signupData, location: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">كلمة المرور</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="أدخل كلمة مرور قوية"
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password">تأكيد كلمة المرور</Label>
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    placeholder="أعد إدخال كلمة المرور"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                    dir="ltr"
                  />
                </div>
                <Button 
                  onClick={handleSignup} 
                  className="w-full"
                  disabled={isLoading || !signupData.email || !signupData.password || !signupData.name}
                >
                  {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;