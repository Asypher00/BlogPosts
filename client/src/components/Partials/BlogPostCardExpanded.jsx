import React from "react";
import { useNavigate } from "react-router-dom";
export const BlogPostCardExpanded = ({ post, onEdit, onDelete, showActions, setExpand }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6" style = {{
            border: "2px solid black",
        }}>
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                    <div className="text-sm text-gray-600">
                        By {post.authorName || post.authorId?.username} • {formatDate(post.createdAt)}
                        {post.updatedAt !== post.createdAt && (
                            <span> • Updated {formatDate(post.updatedAt)}</span>
                        )}
                    </div>
                </div>
                <div className="flex space-x-2">
                    {showActions && (
                        <div className="flex space-x-2">
                            <button
                                onClick={() => onEdit(post)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(post._id)}
                                className="text-red-600 hover:text-red-800 text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="text-gray-700 whitespace-pre-wrap">{post.content}</div>
            <div className="flex space-x-2" style={{display: "flex", flexDirection: "row-reverse"}}>
                <button
                    onClick={() => setExpand(false)}
                    className="text-red-600 hover:text-red-800 text-sm"
                >
                    Back
                </button>
            </div>
        </div >
    );
};