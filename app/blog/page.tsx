'use client';

import { useState, useMemo } from 'react';
import Container from '@/components/Container';
import BlogCard from '@/components/BlogCard';
import BlogFilter from '@/components/BlogFilter';
import Pagination from '@/components/Pagination';
import { getAllBlogs, searchBlogs, paginateBlogs } from '@/lib/blogUtils';
import type { Blog } from '@/types';

const BLOGS_PER_PAGE = 6;

export default function BlogListPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const [searchQuery, setSearchQuery] = useState(searchParams.search || '');
  const [selectedTag, setSelectedTag] = useState<string | null>(
    searchParams.tag || null
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.page || '1', 10)
  );

  // Filter and search logic
  const filteredBlogs = useMemo(() => {
    let result: Blog[] = getAllBlogs();

    if (searchQuery) {
      result = searchBlogs(searchQuery);
    }

    if (selectedTag) {
      result = result.filter((blog) => blog.tags.includes(selectedTag));
    }

    return result;
  }, [searchQuery, selectedTag]);

  // Pagination
  const { data: paginatedBlogs, pages: totalPages } = paginateBlogs(
    filteredBlogs,
    currentPage,
    BLOGS_PER_PAGE
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleTagFilter = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-500 to-blue-600 text-white py-12">
        <Container>
          <h1 className="text-5xl font-bold mb-4">Our Blogs</h1>
          <p className="text-lg opacity-90">
            Explore our extensive collection of cricket articles, tips, and analysis
          </p>
        </Container>
      </section>

      {/* Content */}
      <section className="py-12">
        <Container>
          {/* Filter Section */}
          <BlogFilter onSearch={handleSearch} onTagFilter={handleTagFilter} />

          {/* Results Info */}
          <div className="mb-8">
            <p className="text-gray-600 dark:text-gray-400">
              Found {filteredBlogs.length} article
              {filteredBlogs.length !== 1 ? 's' : ''}
              {searchQuery && ` for "${searchQuery}"`}
              {selectedTag && ` tagged with "${selectedTag}"`}
            </p>
          </div>

          {/* No Results */}
          {paginatedBlogs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
                No blogs found
              </p>
              <p className="text-gray-500 dark:text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <>
              {/* Blog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </Container>
      </section>
    </div>
  );
}
