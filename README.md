# Souls D20 Website

A comprehensive tabletop roleplaying system website built with Next.js 15, featuring an interactive world map, PDF flipbook reader, animated background, and immersive dark fantasy design inspired by Soulsborne games.

## Features

- **Interactive World Map** - Clickable golden breathing circle landmarks with detailed popovers featuring 7 unique locations
- **PDF Flipbook Reader** - Realistic page-turning experience for the 320+ page rulebook with loading isolation
- **Animated Canvas Background** - Atmospheric swirling oil with floating soul trails, toggle-able for accessibility
- **Dynamic Showcase System** - Multi-tab homepage with auto-rotating carousels and centered layouts
- **Info Page Architecture** - Seven alternating sections with scroll-triggered animations and image carousels
- **Responsive Design** - Optimized for desktop and mobile with performance considerations
- **Dark Fantasy Theme** - Custom styling with gold accents and Soulsborne aesthetic
- **SEO Optimized** - Meta tags, sitemap, and social sharing with Open Graph support
- **Accessibility Ready** - ARIA labels, reduced motion support, and semantic HTML

## Tech Stack

- **Next.js 15.5.2** with App Router and typed routes
- **React 19.1.1** with Server/Client Components
- **TypeScript 5.9.2** with strict mode
- **Tailwind CSS 3.4.17** with custom theme extensions
- **Framer Motion 12.23.12** for scroll animations and page transitions
- **Leaflet 1.9.4** for interactive fantasy maps with custom coordinate system
- **React PDF 10.1.0** + **React PageFlip 2.0.3** for realistic book reading
- **Canvas API** for performance-optimized background animations
- **React Hook Form 7.62.0** for contact form handling
- **Lucide React** for consistent iconography

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd SD20
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Development Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production 
npm run start        # Start production server
npm run lint         # Run ESLint code quality checks
```

## Project Structure

```
app/                    # Next.js App Router pages
├── api/contact/        # Contact form API endpoint
├── (pages)/           # Main application pages
├── globals.css        # Global styles and theme tokens
└── layout.tsx         # Root layout with header/footer

components/            # Reusable React components
├── WorldMap.tsx       # Map wrapper with SSR disabled
├── WorldMapInner.tsx  # Leaflet map with custom coordinate system and golden markers
├── Flipbook.tsx       # PDF reader wrapper  
├── PdfFlipClient.tsx  # Main flipbook implementation with performance optimization
├── SoulsBackground.tsx # Canvas-based animated background with soul trails
├── AnimationContext.tsx # React context for animation toggle state
├── InfoCarousel.tsx   # Carousel component with 15s auto-rotation
├── SmallCarousel.tsx  # Auto-rotating image carousel with 2.2s intervals
├── HomeShowcaseTabs.tsx # Homepage showcase with centered text layouts
├── Site*.tsx          # Layout components (Header with animation toggle, Footer)
└── *Tabs.tsx          # Interactive content switchers

public/                # Static assets
├── assets/fonts/      # Custom fonts (EBGaramond, Mantinia)
├── book/             # PDF documents (Souls_D20_Book.pdf)
├── map/              # Fantasy world map image (SD20WorldMap.jpg - 6144x4608px)
└── images/           # Image assets organized by feature
    ├── info/         # Portrait images (image1-7.jpg) for info page sections
    ├── home/         # Homepage showcase images for tabs
    ├── logos/        # Brand logos and titles
    └── landmarks/    # Map landmark imagery for popovers
```

## Configuration

### Custom Fonts
- **EBGaramond** - Primary text font
- **Mantinia** - Decorative display font

### Theme Colors
- **Gold**: #b99933 (primary accent)
- **Background**: #131313 (dark charcoal)
- **Surface**: #1a1a1a (elevated panels)
- **White**: #F0F0F0 (text)

### Environment Setup

No environment variables required for basic functionality.

For contact form, update the API endpoint in `app/api/contact/route.ts`.

### Animation System
The animated background can be toggled via the button in the header (far left). State is persisted in localStorage and managed through React Context.

**Animation Features:**
- Swirling dark oil background with subtle texture
- Floating soul trails that appear/fade with random timing
- Performance-optimized canvas rendering at 60fps
- Automatic pause when tab is not visible
- Respects `prefers-reduced-motion` accessibility setting

## Asset Organization

### Images
```
public/images/
├── info/              # Info page images (image1-7.jpg)
├── home/              # Homepage showcase images
├── logos/             # Brand logos and titles
└── landmarks/         # Map landmark imagery
```

### Image Standards
- **Portrait aspect ratio** (3/4) for main content
- **Object-contain** sizing to prevent cropping
- **Sequential naming** for organization
- **Optimized file sizes** for web performance

## Deployment

### Vercel (Recommended)
```bash
npm run build
```
Deploy to Vercel by connecting your Git repository.

### Self-Hosted
```bash
npm run build
npm run start
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Performance Optimization

### Animation System
- **Canvas Rendering** - Hardware-accelerated background animations
- **Reduced Motion Support** - Automatically disables for accessibility preferences
- **Tab Visibility API** - Pauses animations when tab is inactive
- **Device Detection** - Fewer souls on mobile devices (8 vs 15 desktop)
- **Throttled Resize** - 150ms throttling for resize events to prevent performance drops

### General Optimizations  
- **Image Optimization** - Next.js automatic optimization with proper sizing
- **Code Splitting** - Automatic route-based splitting + dynamic imports for heavy components
- **SSR Disabled** - For client-heavy components (maps, PDF readers, animations)
- **Font Loading** - Optimized with font-display: swap for EBGaramond and Mantinia
- **Static Generation** - Pre-built pages where possible
- **Memory Management** - Proper cleanup of animation frames and event listeners

## SEO Configuration

- **Meta Tags** - Comprehensive title and description system
- **Open Graph** - Social sharing optimization
- **Sitemap** - Auto-generated for all routes
- **Robots.txt** - Search engine permissions
- **Structured Data** - Schema markup for rich results

## Browser Support

### Core Features
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Canvas Animation Requirements
- Chrome 88+ (for OffscreenCanvas support)
- Firefox 85+ (for improved canvas performance)
- Safari 13.4+ (for proper Canvas API support)
- Hardware acceleration recommended for optimal soul trail rendering

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/name`)
5. Open Pull Request

## License

All rights reserved. This project is proprietary.

## Support

For questions or support:
- **Email**: vgtimis133@gmail.com
- **Discord**: [https://discord.gg/UnEKqTx](https://discord.gg/UnEKqTx)