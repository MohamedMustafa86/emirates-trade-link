
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "الهاتف",
      details: ["+971 4 123 4567", "+971 50 123 4567"],
      color: "text-green-600"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "البريد الإلكتروني",
      details: ["info@dubaimerx.com", "support@dubaimerx.com"],
      color: "text-blue-600"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "العنوان",
      details: ["دبي، الإمارات العربية المتحدة", "ص.ب: 12345"],
      color: "text-red-600"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "ساعات العمل",
      details: ["الأحد - الخميس: 8:00 ص - 6:00 م", "السبت: 9:00 ص - 2:00 م"],
      color: "text-purple-600"
    }
  ];

  const offices = [
    {
      city: "دبي (المكتب الرئيسي)",
      address: "مجمع دبي للاستثمار، مكتب 201",
      phone: "+971 4 123 4567",
      email: "dubai@dubaimerx.com",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c"
    },
    {
      city: "أبوظبي",
      address: "المنطقة الاقتصادية، برج الأعمال",
      phone: "+971 2 987 6543",
      email: "abudhabi@dubaimerx.com",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000"
    },
    {
      city: "الشارقة",
      address: "المنطقة الحرة، مجمع التجارة",
      phone: "+971 6 555 0123",
      email: "sharjah@dubaimerx.com",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-lg mb-12">
          <h1 className="text-4xl font-bold mb-4">تواصل معنا</h1>
          <p className="text-xl max-w-3xl mx-auto">
            نحن في DUBAIMERX.COM هنا لمساعدتكم. تواصلوا معنا لأي استفسارات أو طلبات الخدمة
          </p>
        </section>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <section>
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <MessageCircle className="h-8 w-8 text-blue-600 ml-3" />
                  <h2 className="text-2xl font-bold text-gray-800">أرسل لنا رسالة</h2>
                </div>

                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 ml-2" />
                    <span className="text-green-700">تم إرسال رسالتكم بنجاح! سنتواصل معكم قريباً.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">الاسم الكامل *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="أدخل اسمك الكامل"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">اسم الشركة</label>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="اسم شركتكم (اختياري)"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">البريد الإلكتروني *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">رقم الهاتف *</label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 50 123 4567"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">الموضوع *</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="موضوع رسالتكم"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">الرسالة *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="اكتبوا رسالتكم هنا..."
                      rows={6}
                      required
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                  >
                    {isSubmitting ? (
                      "جارٍ الإرسال..."
                    ) : (
                      <>
                        إرسال الرسالة
                        <Send className="mr-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          {/* Contact Information */}
          <section className="space-y-8">
            {/* Contact Cards */}
            <div className="grid gap-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className={`${info.color} ml-4 mt-1`}>
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* WhatsApp Contact */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">واتساب للتواصل السريع</h3>
                <p className="text-gray-600 mb-4">للاستفسارات العاجلة والدعم الفوري</p>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => window.open('https://wa.me/971501234567', '_blank')}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  تواصل عبر واتساب
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Office Locations */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">مكاتب DUBAIMERX.COM</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <img 
                    src={office.image} 
                    alt={office.city}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{office.city}</h3>
                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-red-600 ml-2 mt-1" />
                        <span className="text-sm">{office.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-green-600 ml-2" />
                        <span className="text-sm">{office.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-blue-600 ml-2" />
                        <span className="text-sm">{office.email}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Map Section */}
        <section className="mt-12">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="h-12 w-12 mx-auto mb-4" />
                  <p className="text-lg">خريطة مواقع DUBAIMERX.COM</p>
                  <p className="text-sm">يمكن دمج خريطة Google Maps هنا</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Contact;
