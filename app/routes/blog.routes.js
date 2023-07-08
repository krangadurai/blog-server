const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const  uploadFile  = require("../middlewares/upload");
const blogPostController = require("../controllers/blog.controller");
module.exports = function (router) {
    router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
    });

    // Create a new blog post
    router.post(
    "/api/blogposts",
    [authJwt.verifyToken, uploadFile.single("image")],
    blogPostController.createBlogPost
    );

     // Get all blog posts 
    router.get(
    "/api/blogposts",
    blogPostController.getAllBlogPosts
    );

    // Get blog posts by author name
    router.get(
    "/api/blogposts/author/:authorNameid",
    blogPostController.getBlogPostsByAuthorName
    );

    // Get blog posts by category name
    router.get(
    "/api/blogposts/category/:categoryNameid",
    blogPostController.getBlogPostsByCategoryName
    );

    // Get blog posts by tag name
    router.get(
    "/api/blogposts/tag/:tagName",
    blogPostController.getBlogPostsByTagName
    );
    // Get blog posts by id
    router.get(
        "/api/blogposts/:id",
        blogPostController.getBlogPostById
    );
    // Update a blog post by ID
    router.put(
    "/api/blogposts/:id",
    [authJwt.verifyToken, uploadFile.single("image")],
    blogPostController.updateBlogPostById
    );
   
    // Delete a blog post by ID
    router.delete(
    "/api/blogposts/:id",
    [authJwt.verifyToken],
    blogPostController.deleteBlogPostById
    );
}

