/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cyber-blue': '#00f0ff',
        'matrix-green': '#00ff88', 
        'neon-purple': '#8a2be2',
        'electric-pink': '#ff0080',
        'deep-space': '#0a0a12',
        'neural-dark': '#151522',
        // Novas cores cinza do TradGen atual
        'gray-dark': '#1a1a1a',
        'gray-card': '#2a2a2a',
        'gray-border': '#333333',
      },
      fontFamily: {
        'tech': ['Orbitron', 'monospace'],
        'base': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
