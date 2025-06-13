import React, { useState, useEffect} from "react" ; 
import { Link } from "react-router-dom";
import { BlogPostCard } from "./Partials/BlogPostCard";
import { useAuth } from "../customHooks/useAuth";
import { api } from "../api";
export const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { getAllPosts } = api ;   
  const fetchPosts = async () => {
    try {
      const result = await getAllPosts();
      if (result.success) {
        setPosts(result.data.posts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-600 text-lg">No blog posts yet.</div>
            {isAuthenticated && (
              <div className="text-gray-500 mt-2">
                <Link to="/create" className="text-blue-600 hover:underline">
                  Be the first to create one!
                </Link>
              </div>
            )}
          </div>
        ) : (
          posts.map((post) => (
            <BlogPostCard
              key={post._id}
              post={post}
              showActions={false}
            />
          ))
        )}
      </div>
    </div>
  );
};