import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { addPosts, deletePosts, getPost, getPosts, updatePosts } from '../controllers/post.controller.js';

const router = express.Router();

router.get("/", getPosts)
router.get("/:id", getPost)
router.post("/", verifyToken, addPosts)
router.put("/:id", verifyToken, updatePosts)
router.delete("/:id", verifyToken, deletePosts)

export default router;