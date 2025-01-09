import express from 'express';
import { createBlog, deleteBlog, getAllBlogs, getMyBlogs, getSingleBlog, updateBlogs } from '../controllers/blog.controller.js';
import { isAdmin, isAuthenticated } from '../middleware/authUser.js';

const router = express.Router();

router.post("/create", isAuthenticated, isAdmin("Admin"), createBlog);
router.delete("/delete/:id", isAuthenticated, isAdmin("Admin"), deleteBlog);
router.get("/all-blogs",  getAllBlogs);
router.get("/single-blog/:id", isAuthenticated, getSingleBlog);
router.get("/my-blogs", isAuthenticated,isAdmin("Admin"), getMyBlogs);
router.put("/update/:id", isAuthenticated,isAdmin("Admin"), updateBlogs);


export default router;