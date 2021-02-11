const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Brand, User, Subject, Course } = require('../schemas/schema');
const get_user = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
module.exports = get_user;
