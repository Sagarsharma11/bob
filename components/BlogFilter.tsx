'use client';

import { useState } from 'react';
import { getAllTags } from '@/lib/blogUtils';

interface BlogFilterProps {
  onSearch: (query: string) => void;
  onTagFilter: (tag: string | null) => void;
}

export default function BlogFilter({
  onSearch,
  onTagFilter,
}: BlogFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const tags = getAllTags();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleTagClick = (tag: string) => {
    const newTag = selectedTag === tag ? null : tag;
    setSelectedTag(newTag);
    onTagFilter(newTag);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 mb-8 shadow-md">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search blogs by title, author, or content..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Tag Filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
          Filter by Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                selectedTag === tag
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-accent hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
          {selectedTag && (
            <button
              onClick={() => {
                setSelectedTag(null);
                onTagFilter(null);
              }}
              className="px-4 py-2 rounded-full font-semibold text-sm bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
