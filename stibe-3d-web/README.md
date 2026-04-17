# Stibe Labs - Next.js 3D Website with Three.js

A modern, high-performance website built with Next.js 14, Three.js, and Tailwind CSS. Features interactive 3D animations, smooth scrolling, and responsive design.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd stibe-3d-web
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
stibe-3d-web/
├── app/
│   ├── page.tsx          # Main landing page
│   └── layout.tsx        # Root layout
├── components/
│   ├── Navigation.tsx    # Header navigation
│   ├── HeroScene.tsx     # 3D hero animation
│   ├── FloatingOrb.tsx   # Floating 3D sphere
│   ├── CapabilitiesGrid.tsx
│   ├── PlatformsSection.tsx
│   ├── IndustriesSection.tsx
│   └── WhyStibeSection.tsx
├── styles/
│   └── globals.css       # Global styles
├── public/               # Static assets
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## 🎨 Features

- ✨ **Interactive 3D Scenes** - Built with Three.js for immersive visuals
- 📱 **Fully Responsive** - Optimized for all device sizes
- 🎯 **Smooth Animations** - GSAP and CSS animations
- 🌙 **Dark Theme** - Modern dark UI with purple accents
- ⚡ **Performance Optimized** - Lazy loading and code splitting
- 🔧 **Easy Customization** - Tailwind CSS for quick styling

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **3D Graphics**: Three.js
- **Styling**: Tailwind CSS
- **Animation**: GSAP
- **Language**: TypeScript

## 🎮 3D Components

### HeroScene
- Particle system with 1000+ particles
- Rotating wireframe cubes
- Mouse-tracking animation
- Soft lighting effects

### FloatingOrb
- Icosphere geometry with wireframe overlay
- Multi-light setup with color variances
- Smooth continuous rotation

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🔧 Configuration

### Customize Colors
Edit `tailwind.config.js` to change the primary color from `#5f6bf0` to your preference.

### Modify Content
Edit `app/page.tsx` to change text, sections, and content.

### Adjust 3D Settings
Edit `components/HeroScene.tsx` and `components/FloatingOrb.tsx` for particle count, colors, and animations.

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Three.js Documentation](https://threejs.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📝 License

© 2026 Stibe Labs Pvt Ltd. All rights reserved.
