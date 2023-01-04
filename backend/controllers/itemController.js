const asyncHandler = require('express-async-handler')
const mongoose = require('mongoose')
const Item = require('../models/itemModel')

/**
 * @desc    Gets all items
 * @route   GET /api/items
 * @access  Private
 */
const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find()

  res.status(200).send(items)
})

/**
 * @desc    Adds new item
 * @route   POST /api/items
 * @access  Private
 */
const addItem = asyncHandler(async (req, res) => {
  // Check for name
  if (!req.body.name) {
    res.status(400)
    throw new Error('Please add a name')
  }

  const item = await Item.create({
    name: req.body.name
  })

  res.status(200).send(item)
})

/**
 * @desc    Updates item
 * @route   PUT /api/items/:id
 * @access  Private
 */
const updateItem = asyncHandler(async (req, res) => {
  // Check validity of id
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
    throw new Error('Item not found')
  }

  const item = await Item.findById(req.params.id)

  // Check for item
  if (!item) {
    res.status(400)
    throw new Error('Item not found')
  }

  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })

  res.status(200).json(updatedItem)
})

/**
 * @desc    Deletes item
 * @route   DELETE /api/items/:id
 * @access  Private
 */
const deleteItem = asyncHandler(async (req, res) => {
  // Check validity of id
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
    throw new Error('Item not found')
  }

  const item = await Item.findById(req.params.id)

  // Check for item
  if (!item) {
    res.status(400)
    throw new Error('Item not found')
  }

  await Item.remove()

  res.status(200).send({
    id: req.params.id
  })
})

module.exports = {
  getItems,
  addItem,
  updateItem,
  deleteItem
}
