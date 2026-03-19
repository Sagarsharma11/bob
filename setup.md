# Environment Setup & Configuration Guide

## Prerequisites

- **Node.js:** 18.0 or higher (20+ recommended)
- **npm:** 9.0 or higher
- **Git:** For version control
- **Text Editor:** VS Code recommended

## Verify Installation

```bash
# Check Node.js version
node --version
# Output: v20.x.x or higher

# Check npm version
npm --version
# Output: 10.x.x or higher
```

---

## Project Setup

### Initial Installation (Already Done ✅)

```bash
cd /home/sagar/Desktop/blasters-of-bharat
npm install
```

### Development Mode

```bash
npm run dev
```

- Starts dev server on **http://localhost:3000**
- Hot reload enabled (changes instant)
- TypeScript checking
- Open browser to see your blog

### Production Build

```bash
npm run build
```

Creates optimized production files in `.next/`

### Start Production Server

```bash
npm start
```

Starts server with optimized production build

---

## TypeScript Configuration

File: `tsconfig.json`

Key settings:
```json
{
  "compilerOptions": {
    "target": "ES2020",           // Modern JavaScript
    "strict": true,               // Strict type checking
    "moduleResolution": "node",   // Node.js module resolution
    "jsx": "preserve",            // Preserve JSX for Next.js
    "resolveJsonModule": true,    // Import JSON files
    "paths": {
      "@/*": ["./*"]              // Import alias @/
    }
  }
}
```

---

## Tailwind CSS Configuration

File: `tailwind.config.ts`

```typescript
export default {
  darkMode: "class",              // Dark mode with class
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10b981",        // Green
        secondary: "#059669",      // Dark Green
      },
    },
  },
}
```

### Custom Colors

Edit the `colors` section:
```typescript
colors: {
  primary: "#your-color",
  secondary: "#your-color",
}
```

---

## Next.js Configuration

File: `next.config.mjs`

```javascript
const nextConfig = {
  reactStrictMode: true,  // Strict mode for development
};
```

### Enable Image Optimization

```javascript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
};
```

---

## Environment Variables

Create `.env.local` (optional):

```bash
# Database URLs (if adding backend later)
DATABASE_URL=

# API Keys (if adding integrations)
NEXT_PUBLIC_API_KEY=

# Site URL for SEO
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Using Environment Variables

In code:
```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_KEY;
```

---

## File Aliases (@/)

```typescript
// Instead of:
import BlogCard from '../../../components/BlogCard';

// Use:
import BlogCard from '@/components/BlogCard';
```

Configured in `tsconfig.json`

---

## npm Scripts Explained

```bash
npm run dev
# Starts development server with hot reload

npm run build
# Creates optimized production build

npm start
# Runs production server (requires build first)

npm run lint
# Checks code for issues
```

---

## Folder Structure & Purpose

### `/app` - App Router Pages
- `page.tsx` - Default page component
- `layout.tsx` - Layout wrapper
- `globals.css` - Global styles
- `[slug]/` - Dynamic routes

### `/components` - React Components
Reusable UI components:
- BlogCard.tsx
- Navbar.tsx
- Footer.tsx
- etc.

### `/lib` - Utilities
Helper functions:
- blogUtils.ts - Blog operations
- utils.ts - General utilities

### `/types` - TypeScript Definitions
Type definitions:
- index.ts - Blog, Content types

### `/data` - CMS Data
- blogs.json - Your blog content

### `/public` - Static Files
- images/ - Blog cover images

---

## Common Issues & Solutions

### Issue: Port 3000 Already in Use

**Solution 1:** Use different port
```bash
npm run dev -- -p 3001
```

**Solution 2:** Kill the process
```bash
# macOS/Linux
kill -9 $(lsof -t -i :3000)

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: Dependencies Not Installing

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Build Fails

```bash
# Check for TypeScript errors
npm run build -- --debug

# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

### Issue: Styles Not Showing

```bash
# Rebuild to regenerate CSS
npm run build
npm run dev
```

### Issue: Dark Mode Not Working

- Hard refresh browser: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
- Check browser DevTools > Elements > html tag for `dark` class

---

## Database Integration (Optional Future)

When adding a database:

```bash
npm install prisma @prisma/client
npx prisma init
```

Then:
1. Update `lib/blogUtils.ts` to fetch from DB
2. Create API routes in `/app/api/`
3. Update environment variables

---

## API Routes (Optional Future)

Create `/app/api/blogs/route.ts`:

```typescript
export async function GET() {
  const blogs = getAllBlogs();
  return Response.json(blogs);
}
```

Then access at: `http://localhost:3000/api/blogs`

---

## Debugging

### Enable Debug Logging

```bash
# Development with debugging
DEBUG=* npm run dev
```

### Browser DevTools

1. Open DevTools: `F12` or `Ctrl+Shift+I`
2. Check Console for errors
3. Check Network tab for requests
4. Use React DevTools extension

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

---

## Performance Optimization

### Image Optimization

Use Next.js Image component:
```typescript
import Image from 'next/image';

<Image
  src="/images/blog.jpg"
  alt="Blog cover"
  width={400}
  height={300}
/>
```

### Code Splitting

Next.js automatically splits code. For manual splitting:
```typescript
import dynamic from 'next/dynamic';

const Component = dynamic(() => import('@/components/Heavy'));
```

### Static Generation

Most pages are automatically static. For dynamic routes:
```typescript
export async function generateStaticParams() {
  return blogs.map(blog => ({ slug: blog.slug }));
}
```

---

## Deployment Checklist

Before deploying:

- [ ] Build completes without errors: `npm run build`
- [ ] No TypeScript errors
- [ ] All links work
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] Blog data is correct
- [ ] Images optimized
- [ ] README updated

---

## Local Testing

### Test Production Build Locally

```bash
# Build
npm run build

# Start production server
npm start

# Visit http://localhost:3000
```

### Test Different Devices

1. Use Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test on iPhone, iPad, Android

### Test Dark Mode

1. Open DevTools Console
2. Run: `document.documentElement.classList.add('dark')`
3. Toggle with button in navbar

---

## Useful npm Commands

```bash
# Update all packages
npm update

# Check outdated packages
npm outdated

# Check vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# List installed packages
npm list

# Clear cache
npm cache clean --force
```

---

## Git Commands (for version control)

```bash
# Initialize repository (if needed)
git init

# Add files
git add .

# Commit changes
git commit -m "Add new blog"

# View history
git log --oneline

# Create branch
git checkout -b feature/new-feature
```

---

## Browser Compatibility

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Documentation Files

- **README.md** - Complete documentation
- **QUICKSTART.md** - Quick reference
- **PROJECT_SUMMARY.md** - Project overview
- **setup.md** - This file

---

## Need Help?

1. Check the README.md
2. Check Next.js docs: https://nextjs.org/docs
3. Check Tailwind docs: https://tailwindcss.com
4. Check TypeScript docs: https://www.typescriptlang.org

---

## Summary

Your project is fully configured and ready!

**Quick Start:**
```bash
cd /home/sagar/Desktop/blasters-of-bharat
npm run dev
```

Then visit: **http://localhost:3000** 🚀
