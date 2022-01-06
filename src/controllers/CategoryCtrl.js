const Category = require('../models/Category');
const User = require('../models/User');

class CategoryCtrl {
  // [GET] /api/categories
  async getAllCategory(req, res) {
    try {
      const categories = await Category.find()
        .populate('created_by', ['username', 'name', 'information'])
        .populate('updated_by', ['username', 'name', 'information']);
      res.json({ success: true, categories });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [POST] /api/categories
  async createCategory(req, res) {
    const { name } = req.body;

    // Simple validate
    if (!name)
      return res
        .status(400)
        .json({ success: false, message: 'Name is required' });

    try {
      const category = await Category.findOne({ name });

      // Check for existing category
      if (category)
        return res.status(400).json({
          success: false,
          message: 'Category already exist',
        });

      // Add category in database
      const newCategory = new Category({
        name,
        created_by: req.userId,
      });

      await newCategory.save();
      res.json({
        success: true,
        message: 'Category created successfully',
        category: newCategory,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [PUT] /api/categories/:id
  async updateCategory(req, res) {
    const { name } = req.body;

    // Simple validate
    if (!name)
      return res
        .status(400)
        .json({ success: false, message: 'Name is required' });

    try {
      let updatedCategory = { name, updated_by: req.userId };

      const categoryUpdateCondition = { _id: req.params.id };

      updatedCategory = await Category.findOneAndUpdate(
        categoryUpdateCondition,
        updatedCategory,
        { new: true }
      );

      // Post not found
      if (!updatedCategory)
        return res
          .status(401)
          .json({ success: false, message: 'Category not found' });

      res.json({
        success: true,
        message: 'Update successfully',
        category: updatedCategory,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }

  // [DELETE] /api/categories/:id
  async deleteCategory(req, res) {
    try {
      const categoryDeleteCondition = { _id: req.params.id };
      const deleteCategory = await Category.findOneAndDelete(
        categoryDeleteCondition
      );

      // Post not found
      if (!deleteCategory)
        return res
          .status(401)
          .json({ success: false, message: 'Category not found' });

      res.json({
        success: true,
        message: 'Delete successfully',
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  }
}

module.exports = new CategoryCtrl();
