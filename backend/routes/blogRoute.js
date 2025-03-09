const express = require('express');
const Blog = require('../models/Blog');
const generateSEO = require('../controllers/aiController');
const router = express.Router();

router.get("/", async(req, res)=>{
    res.send('blog route ----')
})

router.post("/", async(req, res)=>{
    const {title, content} = req.body; 
    const seoTitle = await generateSEO(title);
    console.log('---- seo title ---- ', seoTitle)
    const newBlog = await Blog.create({title, content, seoTitle});
    await newBlog.save();
    res.status(200).json(newBlog)
})

module.exports = router;