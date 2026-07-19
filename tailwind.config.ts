import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // The Manteis Project — void + single violet signal
        void: {
          DEFAULT: '#000000',
          raised: '#0C0C0C',
          elevated: '#141414',
          float: '#1C1C1C',
        },
        signal: {
          // Electric Violet — the one signal
          DEFAULT: '#9F67F5',
          dim: 'rgba(159, 103, 245, 0.12)',
          border: 'rgba(159, 103, 245, 0.4)',
        },
        edge: {
          ghost: 'rgba(255,255,255,0.04)',
          faint: 'rgba(255,255,255,0.08)',
          subtle: 'rgba(255,255,255,0.12)',
          medium: 'rgba(255,255,255,0.22)',
          bright: 'rgba(255,255,255,0.45)',
        },
        light: {
          DEFAULT: '#F0F0F0',
          dim: '#999999',
          muted: '#767676',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'scan-line': {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(100vh)' },
        },
        'wave-form': {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(2.5)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'scan-line': 'scan-line 8s linear infinite',
        'wave-form': 'wave-form 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config