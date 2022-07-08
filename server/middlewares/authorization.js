const admin = require('../config/firebase-admin');

function checkAuth(req, res, next) {
  if (req.headers.authorization) {
    admin
      .auth()
      .verifyIdToken(req.headers.authorization)
      .then((decoded) => {
        req.user = decoded;
        next();
      }).catch(() => {
        res.status(403).send({ message: 'Unauthorized' });
      });
  } else {
    res.status(403).send({ message: 'Unauthorized' });
  }
}


module.exports = checkAuth;

