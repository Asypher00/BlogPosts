import React, { useState, useEffect } from "react" ; 
import { Link } from "react-router-dom";
import { useAuth } from "../customHooks/useAuth";
import { api } from "../api";
import { PostForm } from "./Partials/PostForm";
import { BlogPostCard } from "./Partials/BlogPostCard";
export const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const { token } = useAuth();
  const { getMyPosts,updatePost } = api ; 
  const fetchMyPosts = async () => {
    try {
      const result = await getMyPosts(token);
      if (result.success) {
        setPosts(result.data.posts);
      }
    } catch (error) {
      console.error("Error fetching my posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, [token]);

  const handleUpdatePost = async (postData) => {
    try {
      const result = await updatePost(postData, token, editingPost._id);
      if (result.success) {
        setPosts(posts.map(p => p._id === editingPost._id ? result.data.post : p));
        setEditingPost(null);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const result = await api.deletePost(postId, token);
        if (result.success) {
          setPosts(posts.filter(p => p._id !== postId));
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg text-gray-600">Loading your posts...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Posts</h1>
        <Link
          to="/create"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Create New Post
        </Link>
      </div>

      {editingPost && (
        <PostForm
          post={editingPost}
          onSubmit={handleUpdatePost}
          onCancel={() => setEditingPost(null)}
        />
      )}

      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-600 text-lg">You haven't created any posts yet.</div>
            <div className="text-gray-500 mt-2">
              <Link to="/create" className="text-blue-600 hover:underline">
                Create your first post!
              </Link>
            </div>
          </div>
        ) : (
          posts.map((post) => (
            <BlogPostCard
              key={post._id}
              post={post}
              showActions={true}
              onEdit={setEditingPost}
              onDelete={handleDeletePost}
            />
          ))
        )}
      </div>
    </div>
  );
};