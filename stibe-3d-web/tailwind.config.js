/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#ffffff',
        foreground: '#000000',
        surface: 'rgba(255, 255, 255, 0.7)',
        surfaceHover: 'rgba(255, 255, 255, 0.9)',
        border: 'rgba(0, 0, 0, 0.08)',
        accent: '#000000',
        muted: '#666666',
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.5) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
        'glow': '0 0 30px rgba(0, 0, 0, 0.05)',
        'glow-lg': '0 0 60px rgba(0, 0, 0, 0.08)',
      },
      backdropBlur: {
        'xs': '2px',
        'md': '10px',
        'lg': '20px',
      },
    },
  },
  plugins: [],
}
