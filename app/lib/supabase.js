import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";

export const supabaseClient = createClientComponentClient();

export const supabaseServer = createServerComponentClient();
