import blogsData from '@/data/blogs.json';
import type { Blog } from '@/types';

export function getAllBlogs(): Blog[] {
  return blogsData as Blog[];
}

export function getBlogBySlug(slug: string): Blog | null {
  const blogs = getAllBlogs();
  return blogs.find((blog) => blog.slug === slug) || null;
}

export function searchBlogs(query: string): Blog[] {
  const blogs = getAllBlogs();
  const lowerQuery = query.toLowerCase();

  return blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(lowerQuery) ||
      blog.description?.toLowerCase().includes(lowerQuery) ||
      blog.author.toLowerCase().includes(lowerQuery) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

export function filterByTag(tag: string): Blog[] {
  const blogs = getAllBlogs();
  return blogs.filter((blog) => blog.tags.includes(tag));
}

export function getAllTags(): string[] {
  const blogs = getAllBlogs();
  const tags = new Set<string>();
  blogs.forEach((blog) => {
    blog.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function paginateBlogs(
  blogs: Blog[],
  page: number = 1,
  limit: number = 6
): {
  data: Blog[];
  total: number;
  pages: number;
  currentPage: number;
} {
  const total = blogs.length;
  const pages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    data: blogs.slice(startIndex, endIndex),
    total,
    pages,
    currentPage: page,
  };
}

export function getLatestBlogs(count: number = 3): Blog[] {
  const blogs = getAllBlogs();
  return blogs.slice(0, count);
}

export function getFeaturedBlogs(count: number = 3): Blog[] {
  const blogs = getAllBlogs();
  return blogs.slice(0, count);
}

export function getRelatedBlogs(slug: string, limit: number = 3): Blog[] {
  const currentBlog = getBlogBySlug(slug);
  if (!currentBlog) return [];

  const blogs = getAllBlogs().filter((blog) => blog.slug !== slug);

  const related = blogs.sort((a, b) => {
    const aMatches = a.tags.filter((tag) =>
      currentBlog.tags.includes(tag)
    ).length;
    const bMatches = b.tags.filter((tag) =>
      currentBlog.tags.includes(tag)
    ).length;
    return bMatches - aMatches;
  });

  return related.slice(0, limit);
}
