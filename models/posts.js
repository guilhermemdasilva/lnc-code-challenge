const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * Post Schema
 */

const PostSchema = new Schema({
  userId: { type: Number, default: 0 },
  id: { type: Number, default: 0 },
  title: { type: String, default: '' },
  body: { type: String, default: '' },
});

const Posts = mongoose.model('Posts', PostSchema);

module.exports = Posts;
