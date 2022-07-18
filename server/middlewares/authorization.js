/**
 * Author: Deep Adeshra (dp974154@dal.ca)
 *
 * */
const admin = require('../config/firebase-admin');

/**
 * Authentictes incoming request. If user is valid and in our database, then
 * it allows to access the route. Otherwise return 403 HTTP Code.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function checkAuth(req, res, next) {
  if (req.headers.authorization) {
    admin
      .auth()
      .verifyIdToken(req.headers.authorization)
      .then(async (decoded) => {
        const resp = await admin.auth().getUser(decoded.uid)
        req.user = {
          uid: resp.uid,
          user_id: resp.uid,
          email: resp.email,
          emailVerified: resp.emailVerified,
          displayName: resp.displayName,
          photoURL: resp.photoURL
        }
        next();
      }).catch(() => {
        res.status(403).send({ message: 'Unauthorized' });
      });
  } else {
    res.status(403).send({ message: 'Unauthorized' });
  }
}


module.exports = checkAuth;

