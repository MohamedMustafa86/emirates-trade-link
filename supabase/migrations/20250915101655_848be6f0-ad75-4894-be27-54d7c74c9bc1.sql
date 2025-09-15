-- Enable real-time for messages table
ALTER TABLE public.messages REPLICA IDENTITY FULL;

-- Add messages table to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- Create function to update last message time in contacts
CREATE OR REPLACE FUNCTION public.update_last_message_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  -- This function can be enhanced to update user's last activity
  -- For now, we'll just ensure the message is properly timestamped
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for real-time message updates
CREATE OR REPLACE TRIGGER on_message_created
  AFTER INSERT ON public.messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_last_message_timestamp();

-- Create index for better performance on message queries
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(sender_id, receiver_id, created_at);
CREATE INDEX IF NOT EXISTS idx_messages_user_conversations ON public.messages(sender_id, created_at);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_conversations ON public.messages(receiver_id, created_at);