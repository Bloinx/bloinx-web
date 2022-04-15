import { createClient } from "@supabase/supabase-js";

// const options = {
//   schema: "public",
//   headers: { "x-my-custom-header": "Bloinx" },
//   autoRefreshToken: true,
//   persistSession: true,
//   detectSessionInUrl: true,
// };


export default createClient(
  "https://izwkhdbeqviiknksxnqb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6d2toZGJlcXZpaWtua3N4bnFiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY0NzU3MzcwMywiZXhwIjoxOTYzMTQ5NzAzfQ.GLxvCpl8SNTYpgKE25ndF8JdQqr8_QvDLV7ApFFE9u8"
);
