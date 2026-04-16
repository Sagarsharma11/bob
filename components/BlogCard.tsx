import type { Blog } from '@/types';
import Link from 'next/link';
import { formatDate, truncateText } from '@/lib/utils';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center overflow-hidden">
        {blog.coverImage ? (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-500 to-blue-600 flex items-center justify-center">
            <span className="text-white text-4xl font-bold opacity-20">
              {blog.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags.slice(0, 2).map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${tag}`}
              className="inline-block px-3 py-1 text-xs font-semibold text-white bg-orange-500 hover:bg-blue-600 rounded-full transition-colors"
            >
              {tag}
            </Link>
          ))}
          {blog.tags.length > 2 && (
            <span className="inline-block px-3 py-1 text-xs font-semibold text-gray-600 dark:text-gray-400">
              +{blog.tags.length - 2}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
          {truncateText(blog.description || '', 120)}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {blog.author}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {blog.readTime && (
              <span>{blog.readTime} min read</span>
            )}
            <span>{formatDate(blog.date)}</span>
          </div>
        </div>

        {/* Read More Button */}
        <Link
          href={`/blog/${blog.slug}`}
          className="mt-4 inline-block w-full text-center px-4 py-2 bg-orange-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
        >
          Read More
        </Link>
      </div>
    </article>
  );
}
