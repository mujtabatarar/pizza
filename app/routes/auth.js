const jwt = require('jsonwebtoken');
// const { SECRET_KEY } = require('./config'); // Replace with your actual secret key

function authenticateJWT(req, res, next) {
  let token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing Token' });
  }
  token = token.split("Bearer ")[1];

  jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden - Invalid Token' });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateJWT;
