import Container from '@/components/Container';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';
import Image from 'next/image';
import { getLatestBlogs, getFeaturedBlogs, getAllBlogs } from '@/lib/blogUtils';
import VideoGallery from '@/components/VideoGallery';

export default function Home() {
  const latestBlogs = getLatestBlogs(3);
  const featuredBlogs = getFeaturedBlogs(3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-blue-600 text-white py-20">
        <Container>
          <div className="text-center">
            <Image
              src="/images/BOB.png"
              alt="Blasters of Bharat"
              width={100}
              height={100}
              className="w-24 h-24 mx-auto mb-4 rounded-full"
            />
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Blasters of Bharat
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
           Weekend cricket. Pure passion.
            </p>
            <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
             Just a bunch of engineers escaping code on weekends to play cricket and share our matches, stats, and moments from the ground.
            </p>
            <Link
              href="/blog"
              className="inline-block px-8 py-3 bg-white text-orange-500 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Explore Our Blogs
            </Link>
          </div>
        </Container>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16">
        <Container>
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
              Latest Posts
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Check out our most recent cricket insights and analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {latestBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/blog"
              className="inline-block px-8 py-3 bg-orange-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors"
            >
              View All Blogs
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <Container>
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
              Featured Articles
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our hand-picked selection of must-read articles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Videos Section */}
      <section className="py-16">
        <Container>
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
              Match Highlights
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Watch our best moments and weekend matches on YouTube
            </p>
          </div>

          <VideoGallery />
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-orange-500 mb-2">
                {getAllBlogs().length}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Articles Published
              </p>
            </div>

            <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                10K+
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Monthly Readers
              </p>
            </div>

            <div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
              <div className="text-4xl font-bold text-orange-500 mb-2">
                Expert
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Cricket Coaches
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
