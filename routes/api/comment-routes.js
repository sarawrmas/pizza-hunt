const router = require('express').Router();

// destructure method name from object and use names directly
const {
  addComment,
  removeComment,
  addReply,
  removeReply
} = require('../../controllers/comment-controller.js');

// POST comment route at /api/comments/<pizzaId>
router.route('/:pizzaId')
.post(addComment);

// PUT reply and DELETE comment route at /api/comments/<pizzaId>/<commentId>
router.route('/:pizzaId/:commentId')
.put(addReply)
.delete(removeComment);

// DELETE reply route at /api/comments/<pizzaId>/<commentId>/<replyId>
router.route('/:pizzaId/:commentId/:replyId')
.delete(removeReply);

module.exports = router;