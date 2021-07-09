const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat.js');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // use getter function from utils folder
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      default: 'Large'
    },
    toppings: [],
    comments: [
      {
        // get object id from Comment model
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    // tell schema that it can use virtuals
    toJSON: {
      virtuals: true,
      getters: true
    },
    // Mongoose returns a virtual so we don't need id
    id: false
  }
);

// use virtual to get comment count without helper function
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;