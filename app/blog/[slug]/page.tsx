import Container from '@/components/Container';
import ContentRenderer from '@/components/ContentRenderer';
import BlogCard from '@/components/BlogCard';
import ShareButtons from '@/components/ShareButtons';
import { getBlogBySlug, getRelatedBlogs, getAllBlogs } from '@/lib/blogUtils';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export function generateMetadata({ params }: BlogDetailPageProps): Metadata {
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  return {
    title: blog.title,
    description: blog.description || blog.title,
    keywords: blog.tags,
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = getRelatedBlogs(params.slug, 3);

  return (
    <div>
      {/* Hero Section with Cover Image */}
      <div className="bg-gradient-to-br from-orange-500 to-blue-600 text-white py-16">
        <Container>
          <Link
            href="/blog"
            className="inline-flex items-center text-white hover:text-gray-200 mb-6 transition-colors"
          >
            ← Back to Blogs
          </Link>

          <h1 className="text-5xl font-bold mb-4">{blog.title}</h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold">{blog.author}</span>
              <span className="text-sm opacity-75">
                {formatDate(blog.date)}
              </span>
            </div>
            {blog.readTime && (
              <span className="text-sm opacity-75">
                {blog.readTime} min read
              </span>
            )}
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <section className="py-12">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Tags */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag}`}
                    className="inline-block px-4 py-2 bg-orange-500 hover:bg-blue-600 text-white rounded-full font-semibold text-sm transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              <ShareButtons title={blog.title} slug={blog.slug} />
            </div>

            {/* Content */}
            <ContentRenderer content={blog.content} />

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="mb-6 sm:mb-0">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    Written by
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {blog.author}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    Published on
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatDate(blog.date)}
                  </p>
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Enjoyed this article? Share it with your friends!</p>
                <ShareButtons title={blog.title} slug={blog.slug} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="py-12 bg-gray-100 dark:bg-gray-900">
          <Container>
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                Related Articles
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                You might also be interested in these posts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <BlogCard key={relatedBlog.id} blog={relatedBlog} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
