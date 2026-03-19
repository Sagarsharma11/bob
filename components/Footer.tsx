'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">
              🏏 Blasters of Bharat
            </h3>
            <p className="text-gray-400">
              Your ultimate cricket knowledge hub. Expert tips, analysis, and insights from the world of cricket.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  All Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@blastersofbharat.com</li>
              <li>Twitter: @BlastersOfBharat</li>
              <li>Instagram: @BlastersOfBharat</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {currentYear} Blasters of Bharat. All rights reserved. | Built with Next.js & ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
