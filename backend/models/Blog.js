const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: String,
    content: String,
    seoTitle: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog;