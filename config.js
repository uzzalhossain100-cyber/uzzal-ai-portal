// 🔧 Uzzal AI Portal - SECURE CONFIG - NO REAL KEYS IN GITHUB
// GitHub Secret Scanning Block এড়াতে Real Keys এখানে নেই
// Real Keys Vercel Environment Variables এ থাকবে (Secure)

window.SUPABASE_CONFIG = {
  // Supabase - Public URL (safe, anon key is public and allowed)
  url: "https://ikzvfdtpbwwfvjndlfxl.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrenZmZHRwYnd3ZnZqbmRsZnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzNDQ4NzIsImV4cCI6MjEwNjkyMDg3Mn0.rbl-bbbbwCFJ0XT3g8FLm2JyLH6FsQpVafgf6O4V0jM",
  
  // Gemini API Key - EMPTY FOR SECURITY (GitHub Block এড়াতে)
  // Real key will be loaded from:
  // 1. Vercel Environment Variables via /api/config (Recommended, Secure)
  // 2. Or Settings UI (LocalStorage)
  geminiKey: "",
  
  model: "gemini-3.5-flash-lite"
};

// Try to load from Vercel API (secure) - Real key from Vercel ENV
(async()=>{
  try{
    const res = await fetch('/api/config');
    if(res.ok){
      const data = await res.json();
      if(data.geminiKey){
        window.SUPABASE_CONFIG.geminiKey = data.geminiKey;
        console.log('✅ Gemini Key loaded from Vercel ENV (secure)');
        const settings = JSON.parse(localStorage.getItem('uzzal_settings')||'{}');
        settings.geminiKey = data.geminiKey;
        if(data.supabaseUrl) settings.supabaseUrl = data.supabaseUrl;
        if(data.supabaseAnonKey) settings.supabaseKey = data.supabaseAnonKey;
        if(data.model) settings.model = data.model;
        localStorage.setItem('uzzal_settings', JSON.stringify(settings));
      }
    }
  }catch(e){
    console.log('Vercel ENV not available, use Settings UI');
  }
})();

console.log("✅ Secure Config Loaded - No real keys in GitHub");
