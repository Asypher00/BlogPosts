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

router.route("/").get(getAllPosts).post(createPost);

router.route("/:id").get(getPostById).put(updatePost).delete(deletePost);

router.get("/user/my-posts", getMyPosts);

module.exports = router;