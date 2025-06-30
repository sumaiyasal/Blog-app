import Link from "next/link";
import RecentPosts from "./Component/RecentPosts";



export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-blue-500 text-white py-20 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Welcome to the Blog App
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto">
          Discover the latest articles on React, Next.js, JavaScript, and more.
        </p>
        <div className="mt-6">
          <Link
            href="/search"
            className="inline-block bg-white text-teal-600 px-6 py-3 rounded-md font-semibold shadow hover:bg-gray-200 transition duration-300"
          >
            Explore Posts
          </Link>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center text-teal-700">
          Recent Posts
        </h2>
        <RecentPosts limit={6} />
        <div className="text-center mt-10">
          <Link
            href="/search"
            className="inline-block bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700 transition duration-300"
          >
            View All Posts
          </Link>
        </div>
      </section>

      {/* Call to Action Footer */}
      <section className="bg-gray-50 py-12 text-center px-6 border-t border-gray-200">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Want to share your knowledge?
        </h3>
        <p className="mb-6 text-gray-600">
          Create and publish your own articles in minutes.
        </p>
        <Link
          href="/dashboard/create-post"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 font-medium"
        >
          Create Post
        </Link>
      </section>
    </main>
  );
}
