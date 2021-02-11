const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Brand, User, Subject, Course } = require('../schemas/schema');
const user_login = async (req, res) => {
  try {
    const user = await User.findOne({ user_name: req.body.user_name });
    if (!user) {
      return res.send(
        'no such user exists with same username, contact admin for more info'
      );
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.send('password entered for the username is incorrect');
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.header('token', token).send(`${user.user_name} logged in`);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
module.exports = user_login;
