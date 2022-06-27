var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  name: String,
  firebaseId: String,
});

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;