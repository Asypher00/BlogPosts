const User = require("../models/users");
const blogPosts = require("../models/blogs");
const blogSchema = require("../validationSchema/blogSchema");

const getAllPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const posts = await blogPosts.find({})
            .sort({
                createdAt: -1
            })
            .skip(skip)
            .limit(limit)
            .populate("authorId", "username email")
            .lean();

        res.status(200).json({
            success: true,
            data: {
                posts
            },
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const getPostById = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const post = await blogPosts.findById(id)
            .populate("authorId", "username email")
            .lean();

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Blog Post not found"
            });
        }

        res.status(200).json({
            success: true,
            data: {
                post
            },
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const createPost = async (req, res) => {
    try {
        const parsedPayload = blogSchema.safeParse(req.body);
        if (!parsedPayload.success) {
            return res.status(400).json({
                success: false,
                message: "Please maintain the format",
                errors: parsedPayload.error.errors
            });
        }

        const {
            title,
            content
        } = req.body;
        const {
            id: authorId,
            username: authorName
        } = req.user;

        const createdPost = await blogPosts.create({
            title: title.trim(),
            content: content.trim(),
            authorId: authorId,
            authorName,
        });
        
        // Populate the created post
        await createdPost.populate("authorId", "username email");

        res.status(201).json({
            success: true,
            message: "Blog Post Created Successfully",
            data: {
                post: createdPost
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const updatePost = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            title,
            content
        } = req.body;
        const {
            id: userId
        } = req.user;

        const post = await blogPosts.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Blog post not found",
            });
        }

        // Fix: add () to toString and compare as strings
        if (post.authorId.toString() !== userId) {
            return res.status(403).json({
                message: "You can only edit your posts",
                success: false,
            });
        }

        const parsedPayload = blogSchema.safeParse(req.body);

        if (!parsedPayload.success) {
            return res.status(400).json({
                success: false,
                message: "Please maintain the format",
                errors: parsedPayload.error.errors
            });
        }

        const updatedPost = await blogPosts.findByIdAndUpdate(id, {
            title: title.trim(),
            content: content.trim(),
            updatedAt: new Date(),
        }, {
            new: true,
        }).populate("authorId", "username email");

        res.status(200).json({
            success: true,
            message: "Updated Successfully",
            data: {
                post: updatedPost
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const deletePost = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            id: userId
        } = req.user;

        const post = await blogPosts.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Blog post not found",
            });
        }

        if (post.authorId.toString() !== userId) {
            return res.status(403).json({
                message: "You can only delete your posts",
                success: false,
            });
        }

        await blogPosts.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "BlogPost deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const getMyPosts = async (req, res) => {
    try {
        const {
            id: userId
        } = req.user;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const posts = await blogPosts.find({
                authorId: userId
            })
            .sort({
                createdAt: -1
            })
            .skip(skip)
            .limit(limit)
            .populate("authorId", "username email")
            .lean();

        res.status(200).json({
            success: true,
            data: {
                posts
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

module.exports = {
    getAllPosts, 
    getMyPosts, 
    getPostById, 
    updatePost, 
    deletePost, 
    createPost
}