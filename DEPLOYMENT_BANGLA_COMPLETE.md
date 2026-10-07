# 🚀 GitHub + Vercel + Supabase - সম্পূর্ণ ধাপে ধাপে গাইড (বাংলায়)

এই গাইডটি একদম নতুনদের জন্য। কোনো কোডিং জ্ঞান ছাড়াই Live সাইট বানাতে পারবেন।

---

## PART 1: ফাইল ডাউনলোড করুন

### Arena থেকে ফাইল নেওয়া:
1. বাম পাশে Files এ `ai-report-portal` ফোল্ডার দেখতে পাবেন
2. `ai-report-portal.zip` ফাইলটি ডাউনলোড করুন
3. আপনার কম্পিউটারে Unzip করুন
4. ভিতরে 4টি ফাইল থাকবে: `index.html`, `vercel.json`, `supabase-schema.sql`, `README.md`

---

## PART 2: GITHUB এ আপলোড (5 মিনিট)

### উপায় 1: ওয়েবসাইট দিয়ে (সহজ, কোড ছাড়া) - Recommended

1. **GitHub এ যান**: https://github.com → Login করুন
2. উপরে ডান পাশে **+** আইকন → **New repository** ক্লিক করুন
3. Repository name দিন: `uzzal-ai-portal`
4. **Public** সিলেক্ট করুন
5. **Create repository** ক্লিক করুন
6. নতুন পেজ আসবে, সেখানে **uploading an existing file** লিংকে ক্লিক করুন
7. আপনার `ai-report-portal` ফোল্ডারের ভিতরের সব ফাইল **Drag & Drop** করুন (index.html, vercel.json...)
8. নিচে **Commit changes** বাটনে ক্লিক করুন

✅ **Done!** আপনার কোড এখন GitHub এ: `https://github.com/YOUR_USERNAME/uzzal-ai-portal`

### উপায় 2: Git Command দিয়ে (ডেভেলপারদের জন্য)

যদি আপনার PC তে Git ইনস্টল থাকে:

```bash
# 1. ফোল্ডারে যান
cd Downloads/ai-report-portal

# 2. Git শুরু করুন
git init
git add .
git commit -m "Uzzal AI Portal - Initial"

# 3. GitHub এ repo বানিয়ে (Part 2 এর 1-5 ধাপ) তারপর:
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/uzzal-ai-portal.git
git push -u origin main
```

> YOUR_USERNAME এর জায়গায় আপনার GitHub username দিবেন।

---

## PART 3: VERCEL এ LIVE DEPLOY (2 মিনিট) - সবচেয়ে গুরুত্বপূর্ণ

1. **Vercel এ যান**: https://vercel.com → **Sign Up** → **Continue with GitHub** (GitHub দিয়ে Login করুন)
2. Login এর পর **Add New...** → **Project** ক্লিক করুন
3. আপনার `uzzal-ai-portal` repository টি দেখতে পাবেন, তার পাশে **Import** বাটনে ক্লিক করুন
4. Configure Project পেজ আসবে:
   - **Framework Preset**: `Other` সিলেক্ট করুন
   - **Root Directory**: `./` (যেমন আছে থাক)
   - **Build and Output Settings**: কিছু করতে হবে না, খালি রাখুন
5. **Deploy** বাটনে ক্লিক করুন
6. ⏳ 30-60 সেকেন্ড অপেক্ষা করুন... Confetti 🎉 দেখতে পাবেন!
7. **Visit** বাটনে ক্লিক করুন - আপনার Live সাইট!

**আপনার Live URL হবে:**
```
https://uzzal-ai-portal-YOUR_USERNAME.vercel.app
বা
https://uzzal-ai-portal.vercel.app
```

### Vercel এ Custom Domain (ঐচ্ছিক)
- Vercel Dashboard → আপনার Project → Settings → Domains
- আপনার ডোমেইন যোগ করুন

### আপডেট কিভাবে করবেন?
- GitHub এ কোনো ফাইল Edit করলে Vercel **অটো** নতুন Deploy করে দেবে! কিছু করতে হবে না।

---

## PART 4: SUPABASE সেটআপ (10 মিনিট) - ফাইল ক্লাউডে সেভ করার জন্য

> **Note:** এখন আপনার সাইট LocalStorage এ ফাইল সেভ করে। মানে এক ব্রাউজারে সেভ হলে অন্য ব্রাউজারে দেখা যাবে না। Supabase যোগ করলে সব ডিভাইসে, সব ব্রাউজারে একই ফাইল দেখা যাবে + 1GB ফ্রি স্টোরেজ।

### Step 4.1: Supabase Project বানান
1. https://supabase.com → Login (GitHub দিয়ে)
2. **New Project** ক্লিক করুন
3. Project Name: `uzzal-ai-portal`
4. Database Password: একটি শক্ত পাসওয়ার্ড দিন (মনে রাখুন)
5. Region: `Singapore` (বাংলাদেশের কাছাকাছি, ফাস্ট হবে)
6. **Create new project** → 2 মিনিট অপেক্ষা করুন

### Step 4.2: Database Table বানান
1. Supabase Dashboard → বাম মেনুতে **SQL Editor** ক্লিক করুন
2. **New query** ক্লিক করুন
3. নিচের কোডটি কপি-পেস্ট করুন (আমার দেওয়া `supabase-schema.sql` ফাইল থেকে):

```sql
create table if not exists public.files (
  id text primary key,
  display_name text not null,
  description text,
  file_name text not null,
  file_type text,
  size bigint,
  content text,
  full_content_preview text,
  uploaded_at bigint,
  user_id text default 'Uzzal',
  created_at timestamp with time zone default now()
);

alter table public.files enable row level security;

create policy "Allow all for demo"
on public.files for all
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values ('reports', 'reports', true)
on conflict (id) do nothing;

create policy "Public read reports"
on storage.objects for select
using (bucket_id = 'reports');

create policy "Allow upload reports"
on storage.objects for insert
with check (bucket_id = 'reports');

create policy "Allow delete reports"
on storage.objects for delete
using (bucket_id = 'reports');

create policy "Allow update reports"
on storage.objects for update
using (bucket_id = 'reports')
with check (bucket_id = 'reports');
```

4. **Run** বাটনে ক্লিক করুন (নিচে ডান পাশে)
5. ✅ Success দেখালে Done!

### Step 4.3: API Keys নিন
1. Supabase Dashboard → বাম মেনুতে **Project Settings** (⚙️ আইকন, নিচে)
2. **API** ট্যাবে ক্লিক করুন
3. এখানে দুটি জিনিস কপি করুন:
   - **Project URL**: `https://xxxxxxxx.supabase.co` (এটা কপি করুন)
   - **anon public key**: `eyJhbGciOi...` (অনেক বড়, এটা কপি করুন)

### Step 4.4: আপনার Live সাইটে Supabase Connect করুন
1. আপনার Vercel Live সাইটে যান (যেমন: https://uzzal-ai-portal.vercel.app)
2. Login করুন: `Uzzal` / `Goodman321`
3. উপরে ডান পাশে **⚙️** Settings আইকনে ক্লিক করুন
4. Supabase URL এবং Supabase Anon Key পেস্ট করুন
5. **Save** করুন

✅ **Done!** এখন থেকে চাইলে Supabase Cloud ব্যবহার করতে পারবেন।

> **Advanced:** আমি নিচে Supabase সহ Full Cloud Version এর কোডও দিয়েছি (`index-supabase.html`) - চাইলে সেটা ব্যবহার করতে পারেন।

---

## PART 5: GEMINI API KEY যোগ করুন (3 মিনিট)

1. https://aistudio.google.com/app/apikey এ যান → Google Login
2. **Create API Key** → **Create API key in new project** ক্লিক করুন
3. Key টি কপি করুন (AIza... দিয়ে শুরু)
4. আপনার Live সাইটে ⚙️ Settings → Gemini API Key পেস্ট → Save
5. Model: `gemini-1.5-flash` রাখুন (ফাস্ট ও ফ্রি)

**Free Limit:** প্রতি মিনিটে 60 টি রিকোয়েস্ট, প্রতিদিন 1500 টি - আপনার জন্য যথেষ্ট!

---

## PART 6: FINAL TESTING

1. Live সাইটে যান
2. Login: `Uzzal` / `Goodman321`
3. **ফাইল আপলোড** → একটি TXT/CSV ফাইল আপলোড করুন, নাম দিন: `Test Report`
4. **AI রিপোর্ট** → ফাইলটি সিলেক্ট করুন → কমান্ড লিখুন: `এই ফাইল থেকে সারাংশ বানাও`
5. **রিপোর্ট তৈরি করুন** ক্লিক করুন
6. 🎉 AI রিপোর্ট চলে আসবে! ডাউনলোড করতে পারবেন।

---

## ❓ সাধারণ সমস্যা ও সমাধান

**Q: Vercel এ Deploy হচ্ছে না?**
A: Framework Preset `Other` দিন, Build Command খালি রাখুন।

**Q: Gemini API Error 429?**
A: Free limit শেষ। 1 মিনিট অপেক্ষা করুন। বা নতুন API Key বানান।

**Q: ফাইল অন্য ব্রাউজারে দেখা যাচ্ছে না?**
A: LocalStorage ব্যবহার করছেন। Supabase Setup করুন (Part 4)।

**Q: GitHub এ Push করতে পারছি না?**
A: ওয়েবসাইট দিয়ে Upload করুন (Part 2 - উপায় 1) - সবচেয়ে সহজ।

---

## 📞 আপনার জন্য Ready-Made Checklist

- [ ] GitHub Repo বানানো হয়েছে
- [ ] Vercel এ Deploy হয়েছে, Live Link পেয়েছি
- [ ] Supabase Project বানানো হয়েছে
- [ ] SQL Run করা হয়েছে
- [ ] Supabase URL/Key সাইটে যোগ করা হয়েছে
- [ ] Gemini API Key যোগ করা হয়েছে
- [ ] Test ফাইল আপলোড ও AI রিপোর্ট Test করা হয়েছে

সবগুলোতে টিক দিলে আপনার প্রফেশনাল Live AI Portal Ready! 🎉

---

**Need Help?** আমাকে বলুন, আমি Supabase সহ Full Cloud Version (v2) বানিয়ে দেব যেখানে ফাইল অটো ক্লাউডে যাবে।

Made for Uzzal • 2026
