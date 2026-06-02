# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm start        # Run production build
npm run lint     # Next.js ESLint
```

No test runner is configured.

## Architecture

Single-page marketing site for Atya Ebiz Solutions LLP. Built with **Next.js 14 (App Router) + TypeScript + Tailwind + React Three Fiber + Framer Motion**.

### Page composition
`src/app/page.tsx` is the only route — it composes the entire site by rendering section components in order from `src/components/sections/`: Navbar → Hero → WhoWeAre → EcommerceServices → HRServices → WhyUs → HowItWorks → Locations → Contact → Footer.

Section IDs (`#about`, `#ecommerce`, `#hr`, `#why-us`, `#how-it-works`, `#contact`) are referenced by `Navbar.tsx`'s `navLinks`. Adding or renaming a section means updating both the section's `id` prop and the Navbar's link list.

### Client components everywhere
Every section uses `'use client'` because they depend on Framer Motion (`useInView`, `motion`), browser APIs (`window.scrollY`), or React Three Fiber. There is no server-rendered logic.

### 3D scene rule
`Scene3D.tsx` (React Three Fiber Canvas with stars, rings, spheres, grid) is loaded via `next/dynamic` with `ssr: false` in `Hero.tsx`. WebGL has no SSR equivalent — keep the dynamic import or the build breaks.

### Styling system
- **Tailwind config** (`tailwind.config.ts`) defines the brand palette (`brand.orange`, `brand.purple`, `brand.yellow`, `brand.dark*`) and custom keyframes (`float`, `pulseGlow`, `slideUp`, `gradientX`). Use these tokens instead of raw hex values.
- **`src/styles/globals.css`** provides reusable utilities not expressible in Tailwind: `.gradient-text`, `.gradient-text-orange`, `.glow-orange`, `.glow-purple`, `.card-glass` (glassmorphism), and the `.noise-bg` body overlay.
- **Fonts** are loaded via a Google Fonts `@import` in `globals.css` (Syne for display, DM Sans for body) and exposed as CSS vars `--font-display` / `--font-body`, surfaced as `font-display` / `font-body` Tailwind classes. The project does not use `next/font`.

### Path alias
`@/*` resolves to `./src/*` (see `tsconfig.json`). Imports look like `@/components/sections/Hero`.

### Reusable animation primitive
`src/components/ui/AnimatedSection.tsx` is a Framer Motion wrapper that fades + slides children in on scroll using `useInView` with `once: true`. Prefer it over re-implementing the same `initial`/`animate` pattern in new sections.

### Contact form is a stub
`Contact.tsx` uses `react-hook-form` but `onSubmit` only `console.log`s the data after a fake 1s delay. To make it functional, wire it to an API route (`src/app/api/contact/route.ts`) or a third-party service — see README.md "Contact Form" section.

### `next.config.js` quirk
It sets `experimental.appDir: true`, which is a no-op in Next.js 14 (App Router is stable). Don't rely on this flag being meaningful.
