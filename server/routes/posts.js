import express from 'express';
import { deleteUserPosts, getFeedPosts, getUserPosts, likePost } from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Read

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId", verifyToken, getUserPosts);


// Update

router.patch("/:id/like", verifyToken, likePost);

// delete
router.delete("/:id/delete", verifyToken, deleteUserPosts);

export default router;