
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";
import { 
  Search, 
  Send, 
  Menu, 
  Globe, 
  Home, 
  Grid3X3, 
  MessageCircle, 
  User,
  Phone,
  Video,
  MoreVertical,
  Paperclip
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  company: string;
  avatar?: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  type: 'supplier' | 'manufacturer' | 'buyer';
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  type: 'text' | 'image' | 'file';
}

const Messages = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage === "العربية" ? "ar" : currentLanguage === "English" ? "en" : "fr"];
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'أحمد محمد',
      company: 'مجموعة التجارة الخليجية',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      isOnline: true,
      lastMessage: 'شكراً لك، سأراجع عرض الأسعار وأرد عليك قريباً',
      lastMessageTime: '10:30 ص',
      unreadCount: 2,
      type: 'supplier'
    },
    {
      id: '2',
      name: 'فاطمة علي',
      company: 'شركة الشرق الأوسط للتصنيع',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b789',
      isOnline: false,
      lastMessage: 'هل يمكنك إرسال عينات من المنتج؟',
      lastMessageTime: 'أمس',
      unreadCount: 0,
      type: 'manufacturer'
    },
    {
      id: '3',
      name: 'خالد السعدون',
      company: 'موردو الخليج المتحد',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      isOnline: true,
      lastMessage: 'متوفر لدينا الكمية المطلوبة',
      lastMessageTime: 'أمس',
      unreadCount: 1,
      type: 'supplier'
    }
  ];

  const messages: Message[] = selectedContact ? [
    {
      id: '1',
      senderId: 'me',
      content: 'مرحباً، أود الاستفسار عن أسعار منتجاتكم',
      timestamp: '09:00 ص',
      isRead: true,
      type: 'text'
    },
    {
      id: '2',
      senderId: selectedContact.id,
      content: 'أهلاً وسهلاً، سعداء بخدمتك. ما هي المنتجات التي تهتم بها؟',
      timestamp: '09:15 ص',
      isRead: true,
      type: 'text'
    },
    {
      id: '3',
      senderId: 'me',
      content: 'أبحث عن مواد بناء، خاصة الأسمنت والحديد',
      timestamp: '09:20 ص',
      isRead: true,
      type: 'text'
    },
    {
      id: '4',
      senderId: selectedContact.id,
      content: selectedContact.lastMessage,
      timestamp: selectedContact.lastMessageTime,
      isRead: false,
      type: 'text'
    }
  ] : [];

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      // هنا سيتم إرسال الرسالة إلى النظام الخلفي
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.includes(searchQuery) || contact.company.includes(searchQuery)
  );

  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="flex items-center bg-white p-4 pb-2 justify-between border-b border-gray-100">
        <div className="text-[#111418] flex size-12 shrink-0 items-center">
          <Menu className="h-6 w-6" />
        </div>
        
        <div className="flex items-center justify-center">
          <img 
            src="/lovable-uploads/8b27315a-9e7d-4683-a231-655339f73994.png" 
            alt={`${t.siteName} Logo`} 
            className="h-10 w-auto object-contain"
          />
        </div>
        
        <div className="flex w-12 items-center justify-end">
          <button className="flex cursor-pointer items-center justify-center rounded-full h-12 bg-transparent text-[#111418]">
            <Globe className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Contacts Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-xl font-bold mb-4">المراسلات</h2>
            <div className="relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في المحادثات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
                    selectedContact?.id === contact.id 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>{contact.name[0]}</AvatarFallback>
                    </Avatar>
                    {contact.isOnline && (
                      <div className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 mr-3 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-sm truncate">{contact.name}</h3>
                      <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{contact.company}</p>
                    <p className="text-sm text-gray-800 truncate">{contact.lastMessage}</p>
                  </div>
                  
                  {contact.unreadCount > 0 && (
                    <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {contact.unreadCount}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedContact.avatar} />
                    <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="mr-3">
                    <h3 className="font-semibold">{selectedContact.name}</h3>
                    <p className="text-sm text-gray-600">{selectedContact.company}</p>
                    <p className="text-xs text-green-600">
                      {selectedContact.isOnline ? 'متصل الآن' : 'غير متصل'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === 'me' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.senderId === 'me'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === 'me' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="bg-white p-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Textarea
                    placeholder="اكتب رسالتك هنا..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-10 max-h-32 resize-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">مرحباً بك في نظام المراسلات</h3>
                <p className="text-gray-500">اختر محادثة من القائمة للبدء في المراسلة</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex gap-2 border-t border-[#f0f2f4] bg-white px-4 pb-3 pt-2">
        <Link to="/" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#637488]">
          <div className="text-[#637488] flex h-8 items-center justify-center">
            <Home className="h-6 w-6" />
          </div>
          <p className="text-[#637488] text-xs font-medium leading-normal tracking-[0.015em]">الرئيسية</p>
        </Link>
        <Link to="/products" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#637488]">
          <div className="text-[#637488] flex h-8 items-center justify-center">
            <Grid3X3 className="h-6 w-6" />
          </div>
          <p className="text-[#637488] text-xs font-medium leading-normal tracking-[0.015em]">الفئات</p>
        </Link>
        <Link to="/messages" className="flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-[#111418]">
          <div className="text-[#111418] flex h-8 items-center justify-center">
            <MessageCircle className="h-6 w-6 fill-current" />
          </div>
          <p className="text-[#111418] text-xs font-medium leading-normal tracking-[0.015em]">الرسائل</p>
        </Link>
        <Link to="/supplier-dashboard" className="flex flex-1 flex-col items-center justify-end gap-1 text-[#637488]">
          <div className="text-[#637488] flex h-8 items-center justify-center">
            <User className="h-6 w-6" />
          </div>
          <p className="text-[#637488] text-xs font-medium leading-normal tracking-[0.015em]">الملف الشخصي</p>
        </Link>
      </div>
    </div>
  );
};

export default Messages;
