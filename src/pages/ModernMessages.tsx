import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Send, 
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  ArrowLeft,
  Mic,
  Image as ImageIcon
} from "lucide-react";
import { Link } from "react-router-dom";
import FixedFooter from "@/components/FixedFooter";
import { useLanguage } from "@/hooks/useLanguage";

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

const ModernMessages = () => {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (selectedContact && currentUser) {
      fetchMessages();
      setupRealTimeMessages();
    }
  }, [selectedContact, currentUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setCurrentUser(session.user);
      await fetchContacts();
    }
    setIsLoading(false);
  };

  const fetchContacts = async () => {
    try {
      // Fetch users who have exchanged messages with current user
      const { data: messageUsers, error } = await supabase
        .from('messages')
        .select(`
          sender_id,
          receiver_id,
          content,
          created_at,
          users!messages_sender_id_fkey(id, name),
          users!messages_receiver_id_fkey(id, name)
        `)
        .or(`sender_id.eq.${currentUser?.id},receiver_id.eq.${currentUser?.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Process contacts
      const contactsMap = new Map();
      messageUsers?.forEach((msg: any) => {
        const otherUser = msg.sender_id === currentUser?.id 
          ? msg.users_messages_receiver_id_fkey 
          : msg.users_messages_sender_id_fkey;
        
        if (otherUser && !contactsMap.has(otherUser.id)) {
          contactsMap.set(otherUser.id, {
            id: otherUser.id,
            name: otherUser.name,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(otherUser.name)}&background=random`,
            isOnline: Math.random() > 0.5, // Mock online status
            lastMessage: msg.content,
            lastMessageTime: new Date(msg.created_at).toLocaleTimeString('ar-SA', { 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            unreadCount: 0
          });
        }
      });

      setContacts(Array.from(contactsMap.values()));
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const fetchMessages = async () => {
    if (!selectedContact || !currentUser) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${currentUser.id},receiver_id.eq.${selectedContact.id}),and(sender_id.eq.${selectedContact.id},receiver_id.eq.${currentUser.id})`)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);

      // Mark messages as read
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('sender_id', selectedContact.id)
        .eq('receiver_id', currentUser.id);

    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const setupRealTimeMessages = () => {
    if (!selectedContact || !currentUser) return;

    const channel = supabase
      .channel('messages_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `or(and(sender_id.eq.${selectedContact.id},receiver_id.eq.${currentUser.id}),and(sender_id.eq.${currentUser.id},receiver_id.eq.${selectedContact.id}))`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedContact || !currentUser) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: currentUser.id,
          receiver_id: selectedContact.id,
          content: newMessage.trim(),
          is_read: false
        });

      if (error) throw error;

      setNewMessage('');
      toast({
        title: "تم إرسال الرسالة",
        description: "تم إرسال رسالتك بنجاح"
      });

    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في إرسال الرسالة",
        variant: "destructive"
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
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
    <div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-5 w-5 mr-2" />
            الرجوع
          </Link>
          <h1 className="text-lg font-bold">المراسلات</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Contacts Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في المحادثات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 border-gray-200 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Contacts List */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 mb-1 ${
                    selectedContact?.id === contact.id 
                      ? 'bg-blue-50 border border-blue-200 shadow-sm' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white font-semibold">
                        {contact.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {contact.isOnline && (
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 mr-3 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
                      <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate leading-relaxed">
                      {contact.lastMessage}
                    </p>
                  </div>
                  
                  {contact.unreadCount > 0 && (
                    <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-sm">
                      {contact.unreadCount}
                    </div>
                  )}
                </div>
              ))}
              
              {filteredContacts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>لا توجد محادثات</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                      <AvatarImage src={selectedContact.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                        {selectedContact.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="mr-3">
                      <h3 className="font-semibold text-gray-900">{selectedContact.name}</h3>
                      <p className="text-sm text-green-600">
                        {selectedContact.isOnline ? 'متصل الآن' : 'غير متصل'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => {
                    const isMe = message.sender_id === currentUser?.id;
                    return (
                      <div
                        key={message.id}
                        className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                            isMe
                              ? 'bg-blue-500 text-white rounded-br-md'
                              : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className={`text-xs mt-2 ${
                            isMe ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {formatMessageTime(message.created_at)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-end gap-3">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex-1 relative">
                    <Input
                      placeholder="اكتب رسالتك هنا..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-12 pr-12 rounded-full border-gray-300 focus:border-blue-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-100"
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    {newMessage.trim() ? (
                      <Button 
                        onClick={handleSendMessage}
                        className="bg-blue-500 hover:bg-blue-600 rounded-full h-12 w-12 p-0"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="rounded-full h-12 w-12 p-0 hover:bg-gray-100"
                      >
                        <Mic className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Send className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">مرحباً بك في المراسلات</h3>
                <p className="text-gray-600 max-w-sm">اختر محادثة من القائمة الجانبية لبدء المحادثة أو البحث عن محادثة معينة</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <FixedFooter currentLanguage={currentLanguage} />
    </div>
  );
};

export default ModernMessages;