# Uzzal AI Report Portal - স্মার্ট রিপোর্ট ম্যানেজমেন্ট

বাংলা + English সাপোর্ট সহ একটি সম্পূর্ণ AI রিপোর্ট পোর্টাল। Gemini API দিয়ে ফাইল থেকে অটো রিপোর্ট জেনারেশন।

## ✨ ফিচার
- 🔐 **লগইন**: Admin ID: `Uzzal` / Password: `Goodman321`
- 🏠 **হোম পেজ**: Dashboard, Stats, Recent Files
- 📁 **ফাইল আপলোড**: যেকোনো ফাইল + নাম + বিবরণ দিয়ে সেভ, লিস্ট, ডিলিট, সার্চ
- 🤖 **AI রিপোর্ট**: 
  - এক বা একাধিক ফাইল সিলেক্ট
  - বাংলায়/ইংরেজিতে কমান্ড বক্স
  - Gemini 1.5 Flash/Pro দিয়ে স্মার্ট রিপোর্ট
  - Q&A - ফাইল থেকে প্রশ্নের উত্তর
  - ডাউনলোড: TXT, MD, PDF/HTML
- ⚙️ **সেটিংস**: Gemini API Key, Model, Supabase Config

## 🚀 Live Deployment - GitHub + Vercel + Supabase

### 1️⃣ GitHub এ Push করুন
```bash
cd ai-report-portal
git init
git add .
git commit -m "Uzzal AI Portal initial"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/uzzal-ai-portal.git
git push -u origin main
```

### 2️⃣ Vercel এ Deploy (2 মিনিট)
1. https://vercel.com/new এ যান
2. GitHub repo `uzzal-ai-portal` Import করুন
3. Framework: **Other** / Build Command: খালি রাখুন
4. Deploy ক্লিক করুন
5. Live URL পাবেন: `https://uzzal-ai-portal.vercel.app`

> এই প্রজেক্টটি pure HTML/CSS/JS, তাই কোনো build লাগবে না। Vercel অটো detect করবে।

**vercel.json** (ঐচ্ছিক, root এ রাখুন):
```json
{
  "cleanUrls": true,
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### 3️⃣ Supabase সেটআপ (ঐচ্ছিক কিন্তু প্রফেশনাল)
যদি চান ফাইলগুলো ক্লাউডে সেভ হবে:

1. https://supabase.com → New Project
2. SQL Editor এ গিয়ে নিচের SQL রান করুন:

```sql
-- supabase-schema.sql
create table if not exists files (
  id text primary key,
  display_name text not null,
  description text,
  file_name text not null,
  file_type text,
  size bigint,
  content text,
  uploaded_at bigint
);

-- Storage bucket
insert into storage.buckets (id, name, public) values ('reports', 'reports', true)
on conflict (id) do nothing;

-- Policies (public read for demo)
create policy "Public Access" on storage.objects for select using (bucket_id='reports');
create policy "Allow Upload" on storage.objects for insert with check (bucket_id='reports');
create policy "Allow Delete" on storage.objects for delete using (bucket_id='reports');
```

3. Project Settings → API থেকে `URL` এবং `anon key` কপি করুন
4. সাইটে ⚙️ Settings এ গিয়ে Supabase URL + Key পেস্ট করে Save করুন

> বর্তমান ভার্সনে LocalStorage ব্যবহার করা হয়েছে যাতে API Key ছাড়াই ডেমো চলে। Supabase কোড integration এর জন্য `supabase.js` ফাইল যোগ করতে পারেন।

### 4️⃣ Gemini API Key
1. https://aistudio.google.com/app/apikey
2. Create API Key
3. সাইটের ⚙️ Settings এ পেস্ট করুন
4. Model: `gemini-1.5-flash` (ফাস্ট ও ফ্রি)

ফ্রি লিমিট: 60 req/min

## 📁 ফাইল স্ট্রাকচার
```
ai-report-portal/
├── index.html      # সম্পূর্ণ অ্যাপ (Single File App)
├── README.md       # এই ফাইল
├── vercel.json     # Vercel config
└── supabase-schema.sql
```

## 🔧 কাস্টমাইজেশন
- লগইন পরিবর্তন: `index.html` এ `AUTH_USER` / `AUTH_PASS` খুঁজুন
- কালার: Tailwind classes - violet/indigo থিম
- ভাষা: `Hind Siliguri` ফন্ট বাংলা জন্য

## 💡 ব্যবহার টিপস
1. ভালো রেজাল্টের জন্য CSV, TXT, JSON, MD ফাইল আপলোড করুন
2. PDF হলেও টেক্সট extract করার চেষ্টা করে
3. কমান্ড উদাহরণ:
   - "জানুয়ারি মাসের বিক্রয় সারাংশ দাও"
   - "সবচেয়ে বেশি বিক্রি হওয়া ৫টি প্রোডাক্ট বের করো"
   - "Make a professional report with charts"
   - "এই ফাইলে মোট লাভ কত?"

## 📞 সাপোর্ট
এই কোড Vercel, Netlify, GitHub Pages সব জায়গায় চলবে। কোনো সমস্যা হলে Settings থেকে API Key চেক করুন।

---
Made with ❤️ for Uzzal • Powered by Gemini 1.5
