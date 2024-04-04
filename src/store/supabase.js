import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://zmetostzawsbmaoyrlfj.supabase.co";
// https://zmetostzawsbmaoyrlfj.supabase.co
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptZXRvc3R6YXdzYm1hb3lybGZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAyNDc5MDQsImV4cCI6MjAyNTgyMzkwNH0.zI6FhBHuD024YQbIeCtkyh9UoaHIvnJo_qpefkmHlu0
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptZXRvc3R6YXdzYm1hb3lybGZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAyNDc5MDQsImV4cCI6MjAyNTgyMzkwNH0.zI6FhBHuD024YQbIeCtkyh9UoaHIvnJo_qpefkmHlu0";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
