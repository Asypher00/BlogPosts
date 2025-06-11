// const express = require("express");
// const {
//     getAllPosts,
//     getPostById,
//     createPost,
//     updatePost,
//     deletePost,
//     getMyPosts,
// } = require("../controllers/blogPosts");

// const authMiddleware = require("../middlewares/authMiddleware");

// const router = express.Router();

// router.route("/").get(getAllPosts).post(createPost);

// router.route("/:id").get(getPostById).put(updatePost).delete(deletePost);

// router.get("/user/my-posts", getMyPosts);

// module.exports = router;
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

//router.get("/user/my-posts", authMiddleware, getMyPosts);
// Public routes (no authentication required)
router.get("/", getAllPosts);
router.get("/:id", getPostById);

// Protected routes (authentication required)
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

// This route needs to be BEFORE the /:id route to avoid conflicts


module.exports = router;