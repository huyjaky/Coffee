import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aidmhlapqfrmwtpnmmbd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpZG1obGFwcWZybXd0cG5tbWJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMwNzk1NjksImV4cCI6MjAyODY1NTU2OX0.SBUEzFvRkZMu4284wkt4OAxuHU83scpdKZTE1Vqmki0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})