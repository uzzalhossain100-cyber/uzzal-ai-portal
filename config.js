// 🔧 Uzzal AI Portal - LIVE CLOUD CONFIG - HARDCODED FOR ALL DEVICES
// এই ফাইলে Supabase URL ও Key হার্ডকোড করা আছে, তাই যেকোনো ডিভাইস থেকে Live কাজ করবে

window.SUPABASE_CONFIG = {
  // ✅ LIVE SUPABASE - Hardcoded for Uzzal
  url: "https://ikzvfdtpbwwfvjndlfxl.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrenZmZHRwYnd3ZnZqbmRsZnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzNDQ4NzIsImV4cCI6MjEwNjkyMDg3Mn0.rbl-bbbbwCFJ0XT3g8FLm2JyLH6FsQpVafgf6O4V0jM",
  
  // Gemini API Key - যদি থাকে এখানে বসান, তাহলে সব ডিভাইসে অটো কাজ করবে
  // geminiKey: "AIzaSy_YOUR_GEMINI_KEY_HERE",
  
  // Default model
  model: "auto"
};

console.log("✅ Supabase Live Config Loaded:", window.SUPABASE_CONFIG.url);
