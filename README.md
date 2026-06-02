# Atya Ebiz Solutions — Website

A professional, fully animated website built with **Next.js 14 + TypeScript + Tailwind CSS + Three.js**.

## Tech Stack
- **Next.js 14** — Framework with App Router
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **React Three Fiber + Drei** — 3D background scene (Three.js)
- **Framer Motion** — Scroll animations and transitions
- **React Hook Form** — Contact form handling
- **Lucide React** — Icons
- **Fonts** — Syne (display) + DM Sans (body) via Google Fonts

## Sections
1. Navbar — fixed, scroll-aware, mobile responsive
2. Hero — 3D animated background (stars, rings, spheres, grid)
3. Who We Are — company overview
4. E-Commerce Services — 6 service cards
5. HR Services — featured + grid layout
6. Why Partner With Us — 6 benefit cards
7. How It Works — 6-step process
8. Locations — Bengaluru & Gurugram
9. Contact — lead capture form
10. Footer

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Deployment (Recommended: Vercel)

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Click **Deploy** — Vercel auto-detects Next.js
4. Your site is live in ~2 minutes with a free SSL certificate

## Customization

- **Colors**: Edit `tailwind.config.ts` → `colors.brand`
- **Content**: Edit the respective section files in `src/components/sections/`
- **3D Scene**: Edit `src/components/3d/Scene3D.tsx`
- **Fonts**: Change the Google Fonts import in `src/styles/globals.css`

## Contact Form
The form currently logs to console. To make it functional, connect it to:
- **EmailJS** (free, no backend needed)
- **Resend** (modern email API)
- **Formspree** (no-code form backend)
- Your own Next.js API route at `src/app/api/contact/route.ts`
