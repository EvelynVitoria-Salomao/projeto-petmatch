import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseBucket = process.env.SUPABASE_BUCKET as string;

if (!supabaseUrl) {
	throw new Error("Could not find SUPABASE_URL in environment variables");
}
if (!supabaseKey) {
	throw new Error("Could not find SUPABASE_KEY in environment variables");
}
if (!supabaseBucket) {
	throw new Error("Could not find SUPABASE_BUCKET in environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
export const supabasePublicUrl = `${supabaseUrl}/storage/v1/object/public/`;
export { supabaseBucket };
