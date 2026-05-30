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
        // The Manteis Project — void + signal palette
        void: {
          DEFAULT: '#000000',
          raised: '#0A0A0A',
          elevated: '#111111',
          subtle: '#1A1A1A',
        },
        signal: {
          // Primary: Electric Blue — data, cognition, frequency
          DEFAULT: '#007AFF',
          dim: '#0055CC',
          glow: '#007AFF33',
          // Secondary: Amber — warmth, analog, earth
          amber: '#E5A00B',
          'amber-dim': '#B87D08',
          'amber-glow': '#E5A00B22',
        },
        edge: {
          faint: 'rgba(255,255,255,0.06)',
          subtle: 'rgba(255,255,255,0.12)',
          medium: 'rgba(255,255,255,0.2)',
          bright: 'rgba(255,255,255,0.4)',
        },
        light: {
          DEFAULT: '#E8E8E8',
          dim: '#999999',
          muted: '#666666',
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