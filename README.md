# Blasters of Bharat 🏏

A modern cricket blog website built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. The entire blog system is driven by a local JSON file (CMS), making it easy to manage content without a backend database.

## Features

✨ **Core Features:**
- 📰 Blog listing page with all articles
- 📄 Individual blog detail pages with dynamic routing
- 🔍 Search functionality (filter by title, author, content)
- 🏷️ Tag-based filtering
- 📱 Fully responsive design
- 🌙 Dark mode toggle
- 📊 Pagination (frontend only)
- 🎨 Beautiful cricket-themed UI (green + dark colors)

✅ **Advanced Features:**
- TypeScript for type safety
- Reusable `ContentRenderer` component for dynamic content
- Extensible content types (heading, paragraph, list, quote, image, code)
- Related blog suggestions
- SEO-optimized with metadata
- Static generation for fast loading
- Clean, modular code architecture

## Project Structure

```
blasters-of-bharat/
├── app/
│   ├── blog/
│   │   ├── [slug]/
│   │   │   ├── page.tsx          # Blog detail page
│   │   │   └── not-found.tsx     # 404 page
│   │   └── page.tsx              # Blog listing page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/
│   ├── BlogCard.tsx              # Blog card component
│   ├── BlogFilter.tsx            # Search & filter component
│   ├── Container.tsx             # Layout wrapper
│   ├── ContentRenderer.tsx       # Dynamic content renderer
│   ├── DarkModeToggle.tsx        # Dark mode toggle
│   ├── Footer.tsx                # Footer component
│   ├── Navbar.tsx                # Navigation bar
│   └── Pagination.tsx            # Pagination component
├── data/
│   └── blogs.json                # Blog data (CMS)
├── lib/
│   ├── blogUtils.ts              # Blog utilities & functions
│   └── utils.ts                  # General utilities
├── types/
│   └── index.ts                  # TypeScript type definitions
├── public/
│   └── images/                   # Static images
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.ts
└── README.md
```

## Data Structure

All blog data is stored in `/data/blogs.json`. Here's the schema:

```typescript
interface Blog {
  id: number;
  slug: string;                    // URL-friendly identifier
  title: string;
  author: string;
  date: string;                    // YYYY-MM-DD format
  coverImage: string;              // Path to cover image
  description?: string;            // Short description
  tags: string[];                  // Array of tags
  readTime?: number;               // Estimated read time in minutes
  content: ContentBlock[];         // Array of content blocks
}

interface ContentBlock {
  type: 'heading' | 'paragraph' | 'list' | 'image' | 'quote' | 'code';
  value?: string;                  // For heading, paragraph, quote
  items?: string[];                // For list items
  src?: string;                    // For images
  alt?: string;                    // Image alt text
  language?: string;               // For code blocks
}
```

## Getting Started

### Prerequisites
- Node.js 18+ (recommended 20+)
- npm or yarn

### Installation

1. **Navigate to the project directory:**
```bash
cd blasters-of-bharat
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to `http://localhost:3000`

## Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## How to Add a New Blog

1. Open `/data/blogs.json`
2. Add a new object to the array with the following structure:

```json
{
  "id": 7,
  "slug": "your-blog-slug",
  "title": "Your Blog Title",
  "author": "Author Name",
  "date": "2026-03-19",
  "coverImage": "/images/blog7.jpg",
  "description": "Brief description of the blog",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "readTime": 5,
  "content": [
    {
      "type": "heading",
      "value": "Section Heading"
    },
    {
      "type": "paragraph",
      "value": "Your paragraph text here..."
    },
    {
      "type": "list",
      "items": ["Item 1", "Item 2", "Item 3"]
    },
    {
      "type": "quote",
      "value": "A famous quote..."
    }
  ]
}
```

3. Save the file - the blog will automatically appear on the site!

## Content Types

The `ContentRenderer` component supports multiple content types:

### 1. Heading
```json
{
  "type": "heading",
  "value": "Your Heading"
}
```

### 2. Paragraph
```json
{
  "type": "paragraph",
  "value": "Your paragraph text..."
}
```

### 3. List
```json
{
  "type": "list",
  "items": ["Item 1", "Item 2", "Item 3"]
}
```

### 4. Quote
```json
{
  "type": "quote",
  "value": "A meaningful quote..."
}
```

### 5. Image
```json
{
  "type": "image",
  "src": "/images/cricket.jpg",
  "alt": "Description of image"
}
```

### 6. Code Block
```json
{
  "type": "code",
  "language": "javascript",
  "value": "const cricket = 'awesome';"
}
```

## Key Utilities

### `lib/blogUtils.ts`
- `getAllBlogs()` - Get all blogs
- `getBlogBySlug(slug)` - Find blog by slug
- `searchBlogs(query)` - Search blogs
- `filterByTag(tag)` - Filter blogs by tag
- `getAllTags()` - Get all available tags
- `paginateBlogs()` - Pagination logic
- `getLatestBlogs(count)` - Get latest blogs
- `getFeaturedBlogs(count)` - Get featured blogs
- `getRelatedBlogs(slug, limit)` - Get related blogs

### `lib/utils.ts`
- `cn()` - Class name utility
- `formatDate(dateString)` - Format dates
- `calculateReadTime(content)` - Calculate read time
- `truncateText(text, length)` - Truncate text

## Styling

- **Framework:** Tailwind CSS
- **Dark Mode:** Built-in with class-based dark mode
- **Primary Color:** Green (#10b981)
- **Secondary Color:** Emerald (#059669)
- **Responsive:** Mobile-first design

### Theme Configuration

Edit `tailwind.config.ts` to customize colors:

```typescript
colors: {
  primary: "#10b981",      // Green
  secondary: "#059669",    // Darker green
  dark: "#0f172a",
  light: "#f8fafc",
}
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and select your repository
4. Click "Deploy" - Vercel will automatically detect it's a Next.js project
5. Your site will be live!

### Deploy to Other Platforms

Since this is a static-friendly Next.js app, it can be deployed to:
- Netlify
- AWS Amplify
- GitHub Pages (with configuration)
- Any Node.js hosting

## Extending the Project

### Adding New Content Types

1. Update `types/index.ts` with the new content type:
```typescript
export type ContentType = 'heading' | 'paragraph' | 'list' | 'image' | 'quote' | 'code' | 'newtype';
```

2. Add rendering logic in `components/ContentRenderer.tsx`:
```typescript
case 'newtype':
  return <YourComponent key={index} {...block} />;
```

### Customizing the Layout

Edit component files in `/components` to change:
- Navigation bar
- Footer content
- Blog card design
- Pagination style

### Adding More Features

The project is structured to easily add:
- ✅ Author pages
- ✅ Archive by date
- ✅ Newsletter signup
- ✅ Comments system
- ✅ Social sharing buttons
- ✅ Analytics integration

## Best Practices

1. **Keep JSON Clean:** Ensure `/data/blogs.json` is valid JSON
2. **Use Meaningful Slugs:** Make URLs SEO-friendly
3. **Add Descriptions:** Help with SEO and previews
4. **Organize Tags:** Use consistent tag names
5. **Add Read Times:** Helps users decide what to read
6. **Use High-Quality Content:** Rich content blocks improve engagement

## Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### Dark mode not working
Ensure your browser/system dark mode preference is set. The toggle should override it.

### Images not loading
- Check that image paths are correct
- Ensure images are in `/public/images/`
- Use relative paths like `/images/blog1.jpg`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - Feel free to use this project for any purpose.

## Contributing

To improve this project:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support

For questions or issues, please create an issue in the repository.

---

**Built with ❤️ for cricket enthusiasts**

Created with Next.js 14, TypeScript, and Tailwind CSS.
