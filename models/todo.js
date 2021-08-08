const { Schema, model } = require('mongoose')

const TodoSchema = new Schema({
   title: {
      type: String,
      required: [true, "Todo title can't be empty"],
      unique: true
   },
   completed: {
      type: Boolean,
      default: false
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
})

module.exports = model('Todo', TodoSchema)