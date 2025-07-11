import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Edit2, LogOut, Camera, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import FixedFooter from "@/components/FixedFooter";
import { useLanguage } from "@/hooks/useLanguage";
import type { User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  name: string;
  phone: string | null;
  location: string | null;
  user_type: 'buyer' | 'supplier' | 'admin' | null;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentLanguage } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editData, setEditData] = useState({
    name: '',
    phone: '',
    location: ''
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      
      setUser(session.user);
      await fetchProfile(session.user.id);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!session) {
        navigate('/auth');
      } else {
        setUser(session.user);
        await fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        toast({
          title: "خطأ",
          description: "فشل في تحميل بيانات الملف الشخصي",
          variant: "destructive"
        });
      } else {
        setProfile(data);
        setEditData({
          name: data.name,
          phone: data.phone || '',
          location: data.location || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('users')
        .update({
          name: editData.name,
          phone: editData.phone,
          location: editData.location
        })
        .eq('id', user.id);

      if (error) {
        toast({
          title: "خطأ",
          description: "فشل في تحديث البيانات",
          variant: "destructive"
        });
      } else {
        await fetchProfile(user.id);
        setIsEditing(false);
        toast({
          title: "تم بنجاح",
          description: "تم تحديث بياناتك بنجاح"
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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "خطأ",
        description: "فشل في تسجيل الخروج",
        variant: "destructive"
      });
    } else {
      navigate('/');
    }
  };

  const getUserTypeLabel = (userType: string | null) => {
    switch (userType) {
      case 'buyer':
        return 'مشتري';
      case 'supplier':
        return 'مورد';
      case 'admin':
        return 'مدير';
      default:
        return 'غير محدد';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-5 w-5 mr-2" />
          العودة
        </Link>
        <h1 className="text-lg font-bold">الملف الشخصي</h1>
        <Button variant="ghost" onClick={handleLogout} className="text-red-600 hover:text-red-800">
          <LogOut className="h-4 w-4 mr-2" />
          خروج
        </Button>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
                    {profile?.name?.charAt(0) || user?.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div>
                <h2 className="text-xl font-bold">{profile?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <Badge variant="outline" className="mt-2">
                  {getUserTypeLabel(profile?.user_type)}
                </Badge>
              </div>

              <Button 
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="mt-4"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                {isEditing ? 'إلغاء التعديل' : 'تعديل البيانات'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card>
          <CardHeader>
            <CardTitle>بيانات الحساب</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">الاسم</label>
                  <Input
                    value={editData.name}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                    placeholder="اسمك الكامل"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">رقم الهاتف</label>
                  <Input
                    value={editData.phone}
                    onChange={(e) => setEditData({...editData, phone: e.target.value})}
                    placeholder="رقم هاتفك"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">الموقع</label>
                  <Input
                    value={editData.location}
                    onChange={(e) => setEditData({...editData, location: e.target.value})}
                    placeholder="المدينة، البلد"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleUpdateProfile} disabled={isLoading} className="flex-1">
                    {isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                    إلغاء
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                  <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
                  <p className="mt-1 text-sm text-gray-900">{profile?.phone || 'غير محدد'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">الموقع</label>
                  <p className="mt-1 text-sm text-gray-900">{profile?.location || 'غير محدد'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">نوع الحساب</label>
                  <p className="mt-1 text-sm text-gray-900">{getUserTypeLabel(profile?.user_type)}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>إعدادات الحساب</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              تغيير كلمة المرور
            </Button>
            <Button variant="outline" className="w-full justify-start">
              إعدادات الخصوصية
            </Button>
            <Button variant="outline" className="w-full justify-start">
              إعدادات الإشعارات
            </Button>
            <Button 
              variant="destructive" 
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              تسجيل الخروج
            </Button>
          </CardContent>
        </Card>
      </div>

      <FixedFooter currentLanguage={currentLanguage} />
    </div>
  );
};

export default Profile;