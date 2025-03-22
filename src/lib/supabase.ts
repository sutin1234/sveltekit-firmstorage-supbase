import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://upmoftmhdschcdnkdwsd.supabase.co'; // แทนที่ด้วย URL จริง
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwbW9mdG1oZHNjaGNkbmtkd3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NDcwNDAsImV4cCI6MjA1ODIyMzA0MH0.JSrIsA4pZUkjTeVLdN7QETv1fpi_Kh7Icu3tcsJGPSE'; // แทนที่ด้วย Key จริง
export const supabase = createClient(supabaseUrl, supabaseKey);