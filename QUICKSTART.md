# 🚀 Quick Start Guide - Blasters of Bharat

## Installation & Setup (< 2 minutes)

### Step 1: Navigate to the project
```bash
cd /home/sagar/Desktop/blasters-of-bharat
```

### Step 2: Install dependencies (if not already done)
```bash
npm install
```

### Step 3: Start the development server
```bash
npm run dev
```

### Step 4: Open in browser
Visit: **http://localhost:3000**

---

## 📁 Project Overview

```
blasters-of-bharat/
├── data/blogs.json          ← Your blog content (CMS)
├── app/
│   ├── page.tsx             ← Home page
│   ├── blog/page.tsx        ← Blog listing page
│   └── blog/[slug]/page.tsx ← Individual blog pages
├── components/              ← Reusable React components
├── lib/                     ← Utilities & helpers
└── types/                   ← TypeScript definitions
```

---

## ✨ Features

✅ **Home Page** - Hero section + latest & featured blogs
✅ **Blog Listing** - All blogs with search, filter, and pagination
✅ **Blog Details** - Full article with related posts
✅ **Search** - Find blogs by title, author, content
✅ **Tag Filter** - Filter by cricket topics
✅ **Dark Mode** - Toggle in navbar
✅ **Responsive** - Mobile, tablet, desktop
✅ **Fast** - Pre-rendered static pages

---

## 🎨 Customization

### Change Site Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: "#10b981",      // Green
  secondary: "#059669",    // Dark green
}
```

### Change Branding
Edit `components/Navbar.tsx` and `app/page.tsx`:
```typescript
<span>Your Brand Name Here</span>
```

---

## 📝 Add Your First Blog

1. Open `/data/blogs.json`
2. Add a new blog object:

```json
{
  "id": 7,
  "slug": "my-first-blog",
  "title": "My First Blog Post",
  "author": "Your Name",
  "date": "2026-03-19",
  "coverImage": "/images/blog7.jpg",
  "description": "Short description here",
  "tags": ["Cricket", "Tips"],
  "readTime": 5,
  "content": [
    {
      "type": "heading",
      "value": "Introduction"
    },
    {
      "type": "paragraph",
      "value": "Your content here..."
    },
    {
      "type": "list",
      "items": ["Point 1", "Point 2", "Point 3"]
    }
  ]
}
```

3. Save and refresh the browser - **Your blog appears instantly!**

---

## 📚 Available Content Types

```json
// Heading
{ "type": "heading", "value": "Your Title" }

// Paragraph
{ "type": "paragraph", "value": "Your text..." }

// List
{ "type": "list", "items": ["Item 1", "Item 2"] }

// Quote
{ "type": "quote", "value": "A meaningful quote..." }

// Image
{ "type": "image", "src": "/images/pic.jpg", "alt": "Description" }

// Code Block
{ "type": "code", "language": "javascript", "value": "const x = 5;" }
```

---

## 🔧 Available Commands

```bash
# Development (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 🌐 Deployment

### Deploy to Vercel (Free & Easy)
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → select your repo
4. Click "Deploy" → Done!

### Deploy to Netlify
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect GitHub repo
4. Set build command: `npm run build`
5. Set publish directory: `.next`

---

## 📊 Admin Tasks

### View All Blogs
Open `/data/blogs.json` to see all blog data

### Add Tags
Use any tags you want in the `tags` array - they'll auto-generate!

### Update Blog
Edit the blog object in `blogs.json` and save - changes appear instantly

### Delete Blog
Remove the blog object from the JSON array

---

## 🎯 Next Steps

1. ✅ Run the dev server
2. ✅ Explore the site
3. ✅ Add your own blogs
4. ✅ Customize colors and branding
5. ✅ Deploy to Vercel

---

## 📞 Need Help?

### Common Issues

**Port 3000 in use?**
```bash
npm run dev -- -p 3001
```

**Tailwind styles not showing?**
```bash
npm install
npm run build
```

**Dark mode not working?**
Hard refresh browser (Ctrl+Shift+R)

---

## 🎓 Learning Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 🏆 You're All Set!

Your blog is ready to go. Happy blogging! 🏏

Questions? Check the full [README.md](./README.md) for detailed documentation.
