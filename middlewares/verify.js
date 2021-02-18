const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = async (req, res, next) => {
  const token = req.header('token');
  if (!token) return res.send('access denied - need to login');
  try {
    const verify = jwt.verify(token, process.env.SECRET);
    req.client = verify;
    next();
  } catch (err) {
    res.send('Invalid token');
  }
};
module.exports = auth;
