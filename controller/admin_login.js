const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Brand, User, Subject, Course } = require('../schemas/schema');
const admin_login = async (req, res) => {
  try {
    const user = await Brand.findOne({
      brand_name: req.body.brand_name,
      user_name: req.body.user_name,
    });
    if (!user) {
      return res.send('not such exist with provided username and brand');
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.send('password entered is incorrect');
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.header('token', token).send(`${user.user_name} logged in`);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
module.exports = admin_login;
