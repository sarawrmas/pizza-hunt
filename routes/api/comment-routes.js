const router = require('express').Router();

// destructure method name from object and use names directly
const { addComment, removeComment } = require('../../controllers/comment-controller.js');

// Set up POST route at /api/comments/<pizzaId>
router
  .route('/:pizzaId')
  .post(addComment);

// Set up DELETE route at /api/comments/<pizzaId>/<commentId>
router
  .route('/:pizzaId/:commentId')
  .delete(removeComment);

module.exports = router;