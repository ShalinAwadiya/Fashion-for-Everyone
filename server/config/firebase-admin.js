// Author: Deep Adeshra (dp974154@dal.ca)
const admin = require('firebase-admin');
const serviceAccountKey = require("./firebaseAdminKeys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
});

module.exports = admin;