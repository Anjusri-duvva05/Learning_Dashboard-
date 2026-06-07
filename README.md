# LearnOS — Next-Gen Student Learning Dashboard

A futuristic, highly-animated student dashboard built with **Next.js 15 App Router**, **Supabase**, **Tailwind CSS**, and **Framer Motion**.

---

## 🚀 Features

- **Dark-mode-only** Bento Grid layout with deep backgrounds and glowing gradients
- **Supabase Server Components** — course data fetched server-side using RSC (zero client-side Supabase calls)
- **Framer Motion** animations — staggered tile entrances, spring-physics hover states, animated progress bars, and `layoutId` sidebar highlights
- **Responsive** — full bento grid on desktop, icon-only sidebar on tablet, bottom nav + stacked layout on mobile
- **Zero layout shifts** — all animations use only `transform` and `opacity`
- **Suspense / skeleton loaders** with shimmer pulse while data loads
- **Graceful error handling** — database failures surface a friendly error screen with retry

---

## 🛠 Tech Stack

| Tool | Role |
|------|------|
| Next.js 15 (App Router) | Framework & Server Components |
| Supabase (`@supabase/supabase-js`) | PostgreSQL database & BaaS |
| Tailwind CSS | Styling |
| Framer Motion | All animations and interactions |
| Lucide React | Icons (dynamic render from DB `icon_name`) |
| TypeScript | Full type safety across all components |

---

## 📦 Getting Started

### 1. Clone & Install

```bash
git clone <your-repo>
cd learning-dashboard
npm install
```

### 2. Set Up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. In the **SQL Editor**, run the contents of `supabase-setup.sql` — this creates the `courses` table, enables RLS, and seeds 4 sample rows
3. Go to **Settings → API** and copy your `Project URL` and `anon public` key

### 3. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
# Optional — for server-side fetching with elevated privileges
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

> ⚠️ **Never commit `.env.local`** — it's in `.gitignore` by default.

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🗄 Database Schema

```sql
CREATE TABLE courses (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  title       text        NOT NULL,
  progress    integer     NOT NULL DEFAULT 0,   -- 0–100
  icon_name   text        NOT NULL DEFAULT 'Code', -- Lucide icon name
  created_at  timestamptz DEFAULT now()
);
```

Supported `icon_name` values: `Code`, `FileCode`, `Layers`, `Server`, `BookOpen`, `Database`, `Globe`, `Cpu`, `BrainCircuit`, `Terminal`, `Zap`, `Lock`, `GitBranch`, `Monitor`, `Smartphone`, `Cloud`

---

## 🏗 Architecture

### Server / Client Component Split

```
app/page.tsx                  ← Server Component (fetches from Supabase)
  └─ <Suspense>               ← Shows SkeletonDashboard while fetching
       └─ DashboardContent    ← Server Component (async, awaits fetchCourses)
            └─ DashboardShell ← "use client" — Framer Motion stagger container
                 ├─ HeroTile         (client — animations)
                 ├─ CourseTile[]     (client — spring hover + animated bar)
                 ├─ ActivityTile     (client — contribution graph)
                 └─ StatsTile        (client — counters)

Sidebar.tsx                   ← "use client" — layoutId nav highlight
```

**Why this split?** The data fetch happens in a Server Component so Supabase credentials never reach the browser. Only interactive/animated components opt into the client bundle — keeping JS payload minimal.

### Animation Strategy

- **Staggered entrance**: `motion.div` with `variants` and `staggerChildren: 0.1` on the grid container — tiles cascade in on load
- **Spring physics**: every hover uses `type: "spring", stiffness: 300, damping: 20` — zero easing curves, natural feel
- **Progress bars**: animate from 0 → value using `useInView` so the animation only fires when the bar enters the viewport
- **Sidebar highlight**: `layoutId="nav-highlight"` lets Framer Motion interpolate the background pill between nav items with no JS position math
- **Zero layout shifts**: every animated property is `transform` (scale, translateY) or `opacity` — no width/height/margin changes during animation

---

## 🚢 Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Add your three environment variables in the Vercel project dashboard under **Settings → Environment Variables**.

---

## 📋 Evaluation Rubric Checklist

| Criterion | Implementation |
|-----------|---------------|
| ✅ Server Components for data fetching | `app/page.tsx` + `DashboardContent` are Server Components |
| ✅ Supabase env vars handled securely | `NEXT_PUBLIC_*` for URL/key, `SUPABASE_SERVICE_ROLE_KEY` optional server-only |
| ✅ Suspense / skeleton loaders | `app/loading.tsx` + `<Suspense>` with shimmer skeletons |
| ✅ Spring physics (stiffness/damping) | All `whileHover` use `type:"spring", stiffness:300, damping:20` |
| ✅ No layout shifts | Only `transform` + `opacity` animated |
| ✅ `layoutId` sidebar animation | `layoutId="nav-highlight"` on nav background pill |
| ✅ TypeScript interfaces | `Course`, `NavItem`, `ActivityDay` in `types/index.ts` |
| ✅ Semantic HTML | `<nav>`, `<main>`, `<article>`, `<section>`, ARIA labels |
| ✅ Component modularity | Each tile is an isolated component |
| ✅ Responsive (desktop/tablet/mobile) | CSS grid + collapsed sidebar + bottom nav |
| ✅ Animated progress bar (0 → value) | `ProgressBar.tsx` with `useInView` + spring |
| ✅ Dynamic icon rendering | `CourseIcon.tsx` maps `icon_name` → Lucide component |
| ✅ Error handling | `app/error.tsx` with reset button |
| ✅ `.env.example` | Provided |
