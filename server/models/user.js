// Author: Deep Adeshra (dp974154@dal.ca)
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const USER_ROLE = 0;
const ADMIN_ROLE = 1;
const user_roles = [ADMIN_ROLE, USER_ROLE]

/**
 * User model
 */
var UserSchema = new Schema({
  email: String,
  name: String,
  firebaseId: String,
  role: { type: Number, default: USER_ROLE, enum: user_roles }
});

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;