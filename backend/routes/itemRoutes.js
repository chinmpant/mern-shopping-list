const express = require('express')
const router = express.Router()
const {
  getItems,
  addItem,
  updateItem,
  deleteItem
} = require('../controllers/itemController')
const { protect } = require('../middlewares/authMiddleware')

router.route('/').get(protect, getItems).post(protect, addItem)
router.route('/:id').put(protect, updateItem).delete(protect, deleteItem)

module.exports = router
