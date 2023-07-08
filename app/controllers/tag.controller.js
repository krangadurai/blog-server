const Tag = require("../models/tag.model");

// Controller function to create a new tag
const createTag = (req, res) => {
  const { name } = req.body; // Assuming the tag name is sent in the request body

  const tag = new Tag({ name });

  tag
    .save()
    .then((createdTag) => {
      res.json(createdTag);
    })
    .catch((error) => {
      res.status(500).json({ message: "An error occurred", error: error.message });
    });
};

// Controller function to retrieve all tags
const getAllTags = (req, res) => {
  Tag.find()
    .then((tags) => {
      res.json(tags);
    })
    .catch((error) => {
      res.status(500).json({ message: "An error occurred", error: error.message });
    });
};

// Controller function to retrieve a single tag by ID
const getTagById = (req, res) => {
  const { id } = req.params; // Assuming the tag ID is available as a route parameter

  Tag.findById(id)
    .then((tag) => {
      if (!tag) {
        // Tag not found
        return res.status(404).json({ message: "Tag not found" });
      }

      res.json(tag);
    })
    .catch((error) => {
      res.status(500).json({ message: "An error occurred", error: error.message });
    });
};

// Controller function to update a tag by ID
const updateTagById = (req, res) => {
  const { id } = req.params; // Assuming the tag ID is available as a route parameter
  const { name } = req.body; // Assuming the updated tag name is sent in the request body

  Tag.findByIdAndUpdate(id, { name }, { new: true })
    .then((updatedTag) => {
      if (!updatedTag) {
        // Tag not found
        return res.status(404).json({ message: "Tag not found" });
      }

      res.json(updatedTag);
    })
    .catch((error) => {
      res.status(500).json({ message: "An error occurred", error: error.message });
    });
};

// Controller function to delete a tag by ID
const deleteTagById = (req, res) => {
  const { id } = req.params; // Assuming the tag ID is available as a route parameter

  Tag.findByIdAndDelete(id)
    .then((deletedTag) => {
      if (!deletedTag) {
        // Tag not found
        return res.status(404).json({ message: "Tag not found" });
      }

      res.json({ message: "Tag deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: "An error occurred", error: error.message });
    });
};

module.exports = {
  createTag,
  getAllTags,
  getTagById,
  updateTagById,
  deleteTagById,
};
