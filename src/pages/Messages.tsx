
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { translations } from "@/utils/translations";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
  Paperclip,
  ArrowLeft,
  CheckCheck,
  Check,
  Clock,
  Smile,
  ImageIcon,
  FileText
} from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email?: string;
  company?: string;
  avatar?: string;
  isOnline: boolean;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  type: 'supplier' | 'manufacturer' | 'buyer';
}

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
  rfq_id?: string;
}

const Messages = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage === "العربية" ? "ar" : currentLanguage === "English" ? "en" : "fr"];
  const { toast } = useToast();
  
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user);
        await fetchContacts(user.id);
        setupRealTimeMessages(user.id);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchContacts = async (userId: string) => {
    try {
      // جلب المحادثات من جدول الرسائل
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select(`
          *,
          sender:sender_id(id, name, email),
          receiver:receiver_id(id, name, email)
        `)
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (messagesError) throw messagesError;

      // تجميع المحادثات حسب المستخدم الآخر
      const contactsMap = new Map<string, Contact>();
      
      messagesData?.forEach((message: any) => {
        const otherUserId = message.sender_id === userId ? message.receiver_id : message.sender_id;
        const otherUser = message.sender_id === userId ? message.receiver : message.sender;
        
        if (!contactsMap.has(otherUserId)) {
          contactsMap.set(otherUserId, {
            id: otherUserId,
            name: otherUser?.name || otherUser?.email || 'مستخدم غير معروف',
            email: otherUser?.email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(otherUser?.name || otherUser?.email || 'User')}&background=0D8ABC&color=fff`,
            isOnline: Math.random() > 0.5, // محاكاة حالة الاتصال
            lastMessage: message.content,
            lastMessageTime: new Date(message.created_at).toLocaleTimeString('ar-SA', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            unreadCount: 0,
            type: 'supplier'
          });
        }
      });

      setContacts(Array.from(contactsMap.values()));
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast({
        title: "خطأ",
        description: "تعذر جلب قائمة المحادثات",
        variant: "destructive"
      });
    }
  };

  const fetchMessages = async (contactId: string, userId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${userId},receiver_id.eq.${contactId}),and(sender_id.eq.${contactId},receiver_id.eq.${userId})`)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setMessages(data || []);
      
      // تحديد الرسائل كمقروءة
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('sender_id', contactId)
        .eq('receiver_id', userId)
        .eq('is_read', false);

    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "خطأ",
        description: "تعذر جلب الرسائل",
        variant: "destructive"
      });
    }
  };

  const setupRealTimeMessages = (userId: string) => {
    const channel = supabase
      .channel('messages-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          console.log('New message received:', payload);
          const newMessage = payload.new as Message;
          
          // إضافة الرسالة الجديدة إذا كانت متعلقة بالمحادثة الحالية
          if (selectedContact && 
              ((newMessage.sender_id === userId && newMessage.receiver_id === selectedContact.id) ||
               (newMessage.sender_id === selectedContact.id && newMessage.receiver_id === userId))) {
            setMessages(prev => [...prev, newMessage]);
          }
          
          // تحديث قائمة جهات الاتصال
          fetchContacts(userId);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedContact || !currentUser || isSending) return;

    setIsSending(true);
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            sender_id: currentUser.id,
            receiver_id: selectedContact.id,
            content: newMessage.trim(),
            is_read: false
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setMessages(prev => [...prev, data]);
      setNewMessage('');
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "خطأ",
        description: "تعذر إرسال الرسالة",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    if (currentUser) {
      fetchMessages(contact.id, currentUser.id);
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.includes(searchQuery) || contact.email?.includes(searchQuery)
  );

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('ar-SA', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffInHours < 48) {
      return 'أمس';
    } else {
      return date.toLocaleDateString('ar-SA');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-gray-600">جارٍ تحميل المحادثات...</p>
        </div>
      </div>
    );
  }

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
              {filteredContacts.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">لا توجد محادثات حتى الآن</p>
                </div>
              ) : (
                filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => handleContactSelect(contact)}
                    className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 mb-2 hover:shadow-sm ${
                      selectedContact?.id === contact.id 
                        ? 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 shadow-sm' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
                        <AvatarImage src={contact.avatar} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {contact.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      {contact.isOnline && (
                        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 mr-3 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                        <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                      </div>
                      {contact.email && (
                        <p className="text-xs text-gray-500 mb-1">{contact.email}</p>
                      )}
                      <p className="text-sm text-gray-700 truncate">{contact.lastMessage}</p>
                    </div>
                    
                    {contact.unreadCount > 0 && (
                      <Badge className="bg-red-500 text-white text-xs min-w-5 h-5 flex items-center justify-center">
                        {contact.unreadCount}
                      </Badge>
                    )}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="bg-white p-4 border-b border-gray-200 flex items-center justify-between shadow-sm">
                <div className="flex items-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="md:hidden ml-2"
                    onClick={() => setSelectedContact(null)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div className="relative">
                    <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
                      <AvatarImage src={selectedContact.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {selectedContact.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    {selectedContact.isOnline && (
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="mr-3">
                    <h3 className="font-semibold text-gray-900">{selectedContact.name}</h3>
                    {selectedContact.email && (
                      <p className="text-sm text-gray-600">{selectedContact.email}</p>
                    )}
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${selectedContact.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <p className="text-xs text-gray-500">
                        {selectedContact.isOnline ? 'متصل الآن' : 'غير متصل'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                    <Phone className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                    <Video className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                    <MoreVertical className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4 bg-gray-50">
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">ابدأ محادثة جديدة</h3>
                      <p className="text-gray-500">اكتب رسالتك الأولى لبدء المحادثة</p>
                    </div>
                  ) : (
                    messages.map((message) => {
                      const isMe = message.sender_id === currentUser?.id;
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-end gap-2 max-w-xs lg:max-w-md ${isMe ? 'flex-row-reverse' : ''}`}>
                            {!isMe && (
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={selectedContact?.avatar} />
                                <AvatarFallback className="text-xs bg-gray-300">
                                  {selectedContact?.name[0]}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div
                              className={`px-4 py-3 rounded-2xl shadow-sm ${
                                isMe
                                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-sm'
                                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              <div className={`flex items-center gap-1 mt-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <p className={`text-xs ${
                                  isMe ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                  {formatMessageTime(message.created_at)}
                                </p>
                                {isMe && (
                                  <div className="flex items-center">
                                    {message.is_read ? (
                                      <CheckCheck className="h-3 w-3 text-blue-200" />
                                    ) : (
                                      <Check className="h-3 w-3 text-blue-200" />
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="bg-white p-4 border-t border-gray-200">
                <div className="flex items-end gap-3">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-gray-100">
                      <Paperclip className="h-4 w-4 text-gray-600" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-gray-100">
                      <ImageIcon className="h-4 w-4 text-gray-600" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-gray-100">
                      <Smile className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <Textarea
                      placeholder="اكتب رسالتك هنا..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-12 max-h-32 resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      disabled={isSending}
                    />
                  </div>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || isSending}
                    className="h-12 w-12 p-0 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg"
                  >
                    {isSending ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
              <div className="text-center">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 max-w-md">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full w-20 h-20 mx-auto mb-6">
                    <MessageCircle className="h-12 w-12 text-white mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">مرحباً بك في نظام المراسلات</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    تواصل مع الموردين والمصنعين بسهولة وسرعة
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-700">
                      💡 اختر محادثة من القائمة أو ابدأ محادثة جديدة
                    </p>
                  </div>
                </div>
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
