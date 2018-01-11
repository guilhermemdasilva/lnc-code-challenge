const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * Users Schema
 */

const UsersSchema = new Schema({
  id: { type: Number, default: 0 },
  name: { type: String, default: '' },
  username: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  website: { type: String, default: '' },
  address: { type: String, default: '' },
  company: { type: String, default: '' },
});

const Users = mongoose.model('Users', UsersSchema);

module.exports = Users;
