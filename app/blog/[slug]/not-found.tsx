export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">
          Blog post not found
        </p>
        <a
          href="/blog"
          className="inline-block px-8 py-3 bg-primary hover:bg-secondary text-white font-bold rounded-lg transition-colors"
        >
          Go back to blogs
        </a>
      </div>
    </div>
  );
}
