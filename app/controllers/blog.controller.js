const BlogPost = require("../models/blog.model");
const db = require("../models");

const Tag    = db.tag;
const Author = db.user;
const Category = db.category;

const getBaseUrl = (req) => {
  const protocol = req.protocol;
  const host = req.get("host");
  return `${protocol}://${host}`;
};
// Controller function for creating a new blog post
const createBlogPost = async (req, res) => {
  try {
    const { title, description, author_id, img, tag_ids, category_ids, published } = req.body;
    
    // Retrieve author, category, and tag IDs based on their names
    const author = author_id;
    const categories = category_ids;
    console.log(tag_ids);
    const tags = tag_ids.split(",") // Convert tag IDs to ObjectId

    const blogPost = new BlogPost({
      title,
      description,
      author_id: author ? author : null,
      img: req.file ? req.file.filename : null,
      tag_ids: tags,
      category_ids: categories,
      published,
    });

    await blogPost.save();

    res.status(201).json({ success: true, blogPost });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function for get All Blog
const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find() .populate('tag_ids','name') 
    .populate('category_ids','name').populate('author_id',);
    const baseUrl = getBaseUrl(req);

    // Append image URL, author information, tag information, and category information to each blog post
    const blogPostsWithImageAuthorTagCategory = await Promise.all(
      blogPosts.map(async (blogPost) => {
        const authorName = await Author.findById(blogPost.author_id, 'username');
        return {
          ...blogPost.toObject(),
          img: blogPost.img == null ? null : `${baseUrl}/upload/${blogPost.img}`,
          author: authorName
        };
      })
    );

    res.status(200).json({ success: true, blogPosts: blogPostsWithImageAuthorTagCategory });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function for retrieving blog posts by author name
const getBlogPostsByAuthorName = async (req, res) => {
  try {
    const { authorNameid } = req.params;

    // Find blog posts by author ID
    const blogPosts = await BlogPost.find({ author_id: authorNameid }).populate('tag_ids','name') 
    .populate('category_ids','name');;

    const baseUrl = getBaseUrl(req);
     // Append image URL to each blog post
     const blogPostsWithImageAndAuthorName = await Promise.all(
      blogPosts.map(async (blogPost) => {
        const authorName = await Author.findById(blogPost.author_id, 'username');
        return {
          ...blogPost.toObject(),
          img: blogPost.img == null ? null : `${baseUrl}/upload/${blogPost.img}`,
          author: authorName
        };
      })
    );
    res.status(200).json({ success: true,blogPosts: blogPostsWithImageAndAuthorName });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function for retrieving blog posts by category name
const getBlogPostsByCategoryName = async (req, res) => {
  try {
    const { categoryNameid } = req.params;

    // Find blog posts by category ID
    const blogPosts = await BlogPost.find({ category_ids: categoryNameid }).populate('tag_ids') 
    .populate('category_ids');;

    const baseUrl = getBaseUrl(req);
    // Append image URL to each blog post
    const blogPostsWithImageAndAuthorName = await Promise.all(
      blogPosts.map(async (blogPost) => {
        const authorName = await Author.findById(blogPost.author_id, 'username');
        return {
          ...blogPost.toObject(),
          img: blogPost.img == null ? null : `${baseUrl}/upload/${blogPost.img}`,
          author: authorName
        };
      })
    );


   res.status(200).json({ success: true,blogPosts: blogPostsWithImageAndAuthorName });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function for retrieving blog posts by tag name
const getBlogPostsByTagName = async (req, res) => {
  try {
    const { tagName } = req.params;


    // Find blog posts by tag ID
    const blogPosts = await BlogPost.find({ tag_ids: tagName }).populate('tag_ids') 
    .populate('category_ids');;

    const baseUrl = getBaseUrl(req);
    // Append image URL to each blog post
    const blogPostsWithImageAndAuthorName = await Promise.all(
      blogPosts.map(async (blogPost) => {
        const authorName = await Author.findById(blogPost.author_id, 'username');
        return {
          ...blogPost.toObject(),
          img: blogPost.img == null ? null : `${baseUrl}/upload/${blogPost.img}`,
          author: authorName
        };
      })
    );


   res.status(200).json({ success: true,blogPosts: blogPostsWithImageAndAuthorName });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Controller function for updating a blog post by ID
const updateBlogPostById = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Retrieve author, category, and tag IDs based on their names
      const author = updateData.author_id;
      const categories = updateData.category_ids
      const tags = updateData.tag_ids;
      
      // Find and update the blog post
      const blogPost = await BlogPost.findByIdAndUpdate(
        id,
        {
          title: updateData.title,
          description: updateData.description,
          author_id: author,
          img:  req.file ? req.file.filename : updateData.img.split("/").pop(),
          tag_ids: tags,
          category_ids: categories,
          published: updateData.published,
        },
        { new: true }
      );
  
      if (!blogPost) {
        return res.status(404).json({ success: false, error: "Blog post not found" });
      }
  
      res.status(200).json({ success: true, blogPost });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
};

// Controller function for deleting a blog post by ID
const deleteBlogPostById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find and delete the blog post
      const blogPost = await BlogPost.findByIdAndDelete(id);
  
      if (!blogPost) {
        return res.status(404).json({ success: false, error: "Blog post not found" });
      }
  
      res.status(200).json({ success: true, message: "Blog post deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
};

const getBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const blogPost = await BlogPost.findById(id)
      .populate('tag_ids')
      .populate('category_ids');

    const baseUrl = getBaseUrl(req);

    if (!blogPost) {
      return res.status(404).json({ success: false, error: 'Blog post not found' });
    }

    const authorName = await Author.findById(blogPost.author_id, 'name');
    const blogPostWithImageAuthorName = {
      ...blogPost.toObject(),
      img: blogPost.img == null ? null : `${baseUrl}/upload/${blogPost.img}`,
      author: authorName.name // Assuming the 'name' field contains the author's name
    };

    res.status(200).json({ success: true, blogPost: blogPostWithImageAuthorName });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostsByAuthorName,
  getBlogPostsByCategoryName,
  getBlogPostsByTagName,
  updateBlogPostById,
  deleteBlogPostById,
  getBlogPostById
};
