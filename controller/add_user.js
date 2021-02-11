const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Brand, User, Subject, Course } = require('../schemas/schema');
const add_user = async (req, res) => {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.send('password do not match');
    }
    const admin = await Brand.findOne({ _id: req.client._id });
    if (!admin) {
      return res.send('you need to be admin to add users');
    }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      user_name: req.body.user_name,
      password: password,
      role: req.body.role,
    });
    await user.save();
    res.send(`${req.body.name} has been saved as a ${req.body.role}`);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
module.exports = add_user;
