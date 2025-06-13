import React, { useState } from "react";
import { BlogPostCardExpanded } from "./BlogPostCardExpanded";
export const BlogPostCard = ({ post, onEdit, onDelete, showActions = true }) => {
    const [expand, setExpand] = useState(false);
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const truncateContent = (content) => {
        const words = content.split(/\s+/);
        console.log("Test", words);
        if (words.length <= 10) {
            return words;
        }
        return words.slice(0, 10).join(" ") + "...";
    }

    const handleView = () => {
        setExpand(true)
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {
                expand && <BlogPostCardExpanded post={post} onEdit={onEdit} onDelete={onDelete} showActions={showActions} setExpand={setExpand} />
            }
            {!expand &&
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
                    <div>
                        <button
                            onClick={handleView}
                            className="text-green-600 hover:text-green-800 text-sm"
                        >View</button>
                    </div>
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
            }
            {!expand && <div className="text-gray-700 whitespace-pre-wrap">{truncateContent(post.content)}</div>}
        </div>
    );
};