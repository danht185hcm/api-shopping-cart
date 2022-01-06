const express = require('express');
const categoryCtrl = require('../controllers/CategoryCtrl');
const verifyToken = require('../middleware/auth');
const router = express.Router();

/**
 * @route GET api/categories
 * @dec Get all category
 * @access Public
 */
router.get('/', categoryCtrl.getAllCategory);

/**
 * @route POST api/categories
 * @dec Create category
 * @access Private
 */
router.post('/', verifyToken, categoryCtrl.createCategory);

/**
 * @route PUT api/categories/:id
 * @dec Update category
 * @access Private
 */
router.put('/:id', verifyToken, categoryCtrl.updateCategory);

/**
 * @route DELETE api/categories/:id
 * @dec Delete category
 * @access Private
 */
router.delete('/:id', verifyToken, categoryCtrl.deleteCategory);

module.exports = router;
