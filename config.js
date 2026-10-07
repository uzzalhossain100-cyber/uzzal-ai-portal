// 🔧 Uzzal AI Portal - SECURE CONFIG
// GitHub Secret Scanning এর জন্য Real Keys এখানে নেই
// Real Keys Vercel Environment Variables এ থাকবে (Secure)

window.SUPABASE_CONFIG = {
  // Supabase - Public URL (safe to expose, anon key is public)
  url: "https://ikzvfdtpbwwfvjndlfxl.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrenZmZHRwYnd3ZnZqbmRsZnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzNDQ4NzIsImV4cCI6MjEwNjkyMDg3Mn0.rbl-bbbbwCFJ0XT3g8FLm2JyLH6FsQpVafgf6O4V0jM",
  
  // Gemini API Key - EMPTY HERE FOR SECURITY
  // Real key will be loaded from Vercel Environment Variables via /api/config
  // Or set via Settings UI
  geminiKey: "",
  
  model: "gemini-2.5-flash"
};

// Try to load from Vercel API (secure)
(async()=>{
  try{
    const res = await fetch('/api/config');
    if(res.ok){
      const data = await res.json();
      if(data.geminiKey){
        window.SUPABASE_CONFIG.geminiKey = data.geminiKey;
        console.log('✅ Gemini Key loaded from Vercel ENV (secure)');
        // Also save to localStorage for app
        const settings = JSON.parse(localStorage.getItem('uzzal_settings')||'{}');
        settings.geminiKey = data.geminiKey;
        settings.supabaseUrl = data.supabaseUrl || settings.supabaseUrl;
        settings.supabaseKey = data.supabaseAnonKey || settings.supabaseKey;
        localStorage.setItem('uzzal_settings', JSON.stringify(settings));
      }
      if(data.supabaseUrl) window.SUPABASE_CONFIG.url = data.supabaseUrl;
      if(data.supabaseAnonKey) window.SUPABASE_CONFIG.anonKey = data.supabaseAnonKey;
      if(data.model) window.SUPABASE_CONFIG.model = data.model;
    }
  }catch(e){
    console.log('Vercel ENV not available, using local Settings');
  }
})();

console.log("✅ Supabase Config Loaded (Secure Mode)");
