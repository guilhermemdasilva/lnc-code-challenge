const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * Comment Schema
 */

const CommentSchema = new Schema({
  postId: { type: Number, default: 0 },
  id: { type: Number, default: 0 },
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  body: { type: String, default: '' },
});

const Comments = mongoose.model('Comments', CommentSchema);

module.exports = Comments;
