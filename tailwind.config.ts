/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        brand: {
          navy: '#0B1B2B',
          'navy-light': '#1A2D44',
          'navy-dark': '#06121E',
          orange: '#F26B1F',
          'orange-light': '#F58A4B',
          'orange-dark': '#C8501A',
          cream: '#FAF8F4',
          paper: '#FFFFFF',
          ink: '#0B1B2B',
          muted: '#5B6B7C',
          line: '#E6E2DA',
          yellow: '#F4B400',
          // Legacy tokens kept temporarily so unmigrated components still compile.
          // Removed in Phase 9 cleanup once every section uses the new palette.
          'purple-light': '#9B59F5',
          purple: '#6B0AC9',
          'orange-deprecated': '#FF5C00',
        },
      },
      boxShadow: {
        card: '0 4px 24px -8px rgba(11, 27, 43, 0.08)',
        'card-hover': '0 12px 36px -12px rgba(11, 27, 43, 0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'gradient-x': 'gradientX 8s ease infinite',
        'ripple': 'ripple 2.5s ease-out infinite',
        'marquee': 'marquee 35s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        ripple: {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(3)', opacity: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
    },
  },
  plugins: [],
}
