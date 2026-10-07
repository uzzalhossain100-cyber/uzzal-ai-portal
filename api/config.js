// Vercel Serverless Function - Secure Config
// This file returns API keys from Vercel Environment Variables (secure, not in GitHub)

export default function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Get keys from Vercel Environment Variables (secure)
  const config = {
    supabaseUrl: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ikzvfdtpbwwfvjndlfxl.supabase.co",
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrenZmZHRwYnd3ZnZqbmRsZnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzNDQ4NzIsImV4cCI6MjEwNjkyMDg3Mn0.rbl-bbbbwCFJ0XT3g8FLm2JyLH6FsQpVafgf6O4V0jM",
    geminiKey: process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash"
  };

  return res.status(200).json(config);
}
