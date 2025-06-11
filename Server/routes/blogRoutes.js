const express = require("express");
const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getMyPosts,
} = require("../controllers/blogPosts");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();


router.get("/user/my-posts", authMiddleware, getMyPosts);

// Public routes (no authentication required)
router.get("/", getAllPosts);
router.get("/:id", getPostById);

// Protected routes (authentication required)
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;