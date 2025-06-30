"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearchPostsMutation } from "../lib/redux/api/blogApi";
import PostCard from "./PostCard";


export default function SearchPage() {
  const [formData, setFormData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "all",
  });

  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [ready, setReady] = useState(false); 
  const [searchPosts] = useSearchPostsMutation();

  const searchParams = useSearchParams();
  const router = useRouter();

  const fetchPosts = async (startIndex = 0) => {
    const payload = {
      limit: 9,
      order: formData.sort,
      searchTerm: formData.searchTerm,
      startIndex,
      ...(formData.category !== "all" && { category: formData.category }),
    };

    try {
      const res = await searchPosts(payload).unwrap();
      if (startIndex === 0) {
        setPosts(res.posts);
      } else {
        setPosts((prev) => [...prev, ...res.posts]);
      }
      setShowMore(res.posts.length === 9);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const term = urlParams.get("searchTerm") || "";
    const sort = urlParams.get("sort") || "desc";
    const cat = urlParams.get("category") || "all";

    setFormData({ searchTerm: term, sort, category: cat });
    setReady(true); 
  }, [searchParams]);

  useEffect(() => {
    if (ready) {
      fetchPosts();
    }
  }, [formData, ready]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(formData).toString();
    router.push(`/search?${query}`);
  };

  const handleShowMore = () => {
    fetchPosts(posts.length);
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar Form */}
      <aside className="md:w-1/3 p-6 border-b md:border-b-0 md:border-r border-gray-300 bg-gray-50">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold">Filter Posts</h2>

          <div className="flex flex-col gap-1">
            <label htmlFor="searchTerm" className="font-medium">
              Search
            </label>
            <input
              id="searchTerm"
              name="searchTerm"
              value={formData.searchTerm}
              onChange={handleChange}
              placeholder="Search..."
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="sort" className="font-medium">
              Sort
            </label>
            <select
              id="sort"
              name="sort"
              value={formData.sort}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="font-medium">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2 rounded-md"
            >
              <option value="all">All</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>
        </form>
      </aside>

      {/* Post Results */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 border-b pb-2">Posts</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {posts.length === 0 ? (
            <p className="text-gray-500 col-span-full">No posts found.</p>
          ) : (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          )}
        </div>

        {showMore && (
          <div className="mt-6 text-center">
            <button
              onClick={handleShowMore}
              className="text-blue-600 font-medium hover:underline"
            >
              Show More
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
