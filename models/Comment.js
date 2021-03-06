const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat.js');

const ReplySchema = new Schema(
  {
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String,
      required: 'You must enter text for your reply!',
      trim: true
    },
    writtenBy: {
      type: String,
      required: 'You must include your name!',
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
)

const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String,
      required: 'You must include your name!',
      trim: true
    },
    commentBody: {
      type: String,
      required: 'You must enter text for your comment!',
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    replies: [ReplySchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;