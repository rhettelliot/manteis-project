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
        canvas: '#0D0F12',
        surface: '#15181E',
        'surface-hi': '#1A1E24',
        ink: {
          DEFAULT: '#F4F3EE',
          2: '#9EA4B0',
          3: '#5C6370',
          ghost: 'rgba(244, 243, 238, 0.20)',
        },
        signal: '#FF5500',
        'signal-dim': 'rgba(255, 85, 0, 0.15)',
        border: 'rgba(255, 255, 255, 0.08)',
        'border-hi': 'rgba(255, 255, 255, 0.14)',
        cream: '#F4F3EE',
        // Legacy aliases
        void: {
          DEFAULT: '#0D0F12',
          raised: '#15181E',
          elevated: '#1A1E24',
          float: '#1C1C1C',
        },
        edge: {
          ghost: 'rgba(255,255,255,0.04)',
          faint: 'rgba(255,255,255,0.08)',
          subtle: 'rgba(255,255,255,0.12)',
          medium: 'rgba(255,255,255,0.22)',
          bright: 'rgba(255,255,255,0.45)',
        },
        light: {
          DEFAULT: '#F4F3EE',
          dim: '#9EA4B0',
          muted: '#5C6370',
        },
        cream: {
          DEFAULT: '#F4F3EE',
          dim: '#9EA4B0',
          muted: '#5C6370',
        },
      },
      fontFamily: {
        display: ['var(--font-body)', 'system-ui', 'sans-serif'],
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
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'scan-line': 'scan-line 8s linear infinite',
        'wave-form': 'wave-form 1.2s ease-in-out infinite',
        marquee: 'marquee 24s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config