import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

export type Message = {
  id: string;
  sender_id: string;
  sender_name: string;
  sender_avatar?: string;
  sender_role: string;
  receiver_id: string;
  conversation_id: string;
  content: string;
  created_at: string;
};
