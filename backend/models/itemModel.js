const mongoose = require('mongoose')

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name']
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Item', itemSchema)
