/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 品牌色系
        'brand-pink': '#fb7299',
        'brand-blue': 'var(--brand_blue)',
        'stress-red': 'var(--stress_red)',
        'success-green': 'var(--success_green)',
        'operate-orange': 'var(--operate_orange)',
        'pay-yellow': 'var(--pay_yellow)',
        
        // 背景色系
        'bg-1': 'var(--bg1)',
        'bg-2': 'var(--bg2)',
        'bg-3': 'var(--bg3)',
        
        // 文本色系
        'text-1': '#18191c',
        'text-2': '#61666D',
        'text-3': 'var(--text3)',
        'text-4': 'var(--text4)',
        'text-link': 'var(--text_link)',
        
        // 线条色系
        'line-light': 'var(--line_light)',
        'line-regular': 'var(--line_regular)',
        'line-bold': 'var(--line_bold)',
      },
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      spacing: {
        '140': '140px',
        '168': '168px',
      },
      keyframes: {
        jump: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'jump': 'jump 0.5s ease-in-out',
      },
      boxShadow: {
        'custom': '0 0 10px 0 rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
} 