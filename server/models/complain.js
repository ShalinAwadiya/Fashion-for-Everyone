// Shalin Hasanbhai Awadiya - B00892907
const mongoose = require("mongoose");

// The below mentioned schema specifies the mongoDB collection and document details for complain management.

const complainSchema = new mongoose.Schema({
  complainId: {
    type: String,
    required: false,
  },
  complainSubject: {
    type: String,
    required: false,
  },
  complainDescription: {
    type: String,
    required: false,
  },
  complainDate: {
    type: String,
    required: false,
  },
  complainTime: {
    type: String,
    required: false,
  },
  complainStatus: {
    type: String,
    required: false,
  },
  complainImage: {
    type: String,
    required: false,
  },
  complainFrom_LoginId: {
    type: String,
    required: false,
  },
  replySubject: {
    type: String,
    required: false,
  },
  replyMessage: {
    type: String,
    required: false,
  },
  replyDate: {
    type: String,
    required: false,
  },
  replyTime: {
    type: String,
    required: false,
  },
});

const ComplainModel = mongoose.model("Complain", complainSchema);

module.exports = ComplainModel;
