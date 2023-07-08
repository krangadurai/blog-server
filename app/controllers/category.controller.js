const Category = require("../models/category.model");

// Controller function for creating a new category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });

    await category.save();

    res.status(201).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function for retrieving all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function for retrieving a category by ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ success: false, error: "Category not found" });
    }

    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function for updating a category by ID
const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByIdAndUpdate(id, { name }, { new: true });

    if (!category) {
      return res.status(404).json({ success: false, error: "Category not found" });
    }

    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller function for deleting a category by ID
const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ success: false, error: "Category not found" });
    }

    res.status(200).json({ success: true, category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
