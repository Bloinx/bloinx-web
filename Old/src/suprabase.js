import { createClient } from "@supabase/supabase-js";

// const options = {
//   schema: "public",
//   headers: { "x-my-custom-header": "Bloinx" },
//   autoRefreshToken: true,
//   persistSession: true,
//   detectSessionInUrl: true,
// };

export default createClient(
  "https://ewtpaspwertzclcscwfy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTQyNzU1MSwiZXhwIjoxOTU3MDAzNTUxfQ.gqce-yOrxWHCnquH20TQEmeQnpRiHxmF9P55oeZCEkU"
);
