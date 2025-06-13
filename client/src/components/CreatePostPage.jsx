import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../customHooks/useAuth";
import { api } from "../api";
import { PostForm } from "./Partials/PostForm";
export const CreatePostPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { createPost } = api ; 
  const handleCreatePost = async (postData) => {
    try {
      const result = await createPost(postData, token);
      if (result.success) {
        navigate("/my-posts");
      } else {
        throw new Error(result.message || "Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PostForm
        onSubmit={handleCreatePost}
        onCancel={() => navigate("/my-posts")}
      />
    </div>
  );
};
