const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Brand, User, Subject, Course } = require('../schemas/schema');
const admin_register = async (req, res) => {
  try {
    const user = await Brand.findOne({user_name : req.body.user_name})
    if (user)  {return res.send("user with same uername already exists")}
    if (req.body.password != req.body.confirm_password) {
      return res.send('password do not match');
    }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const brand = new Brand({
      brand_name: req.body.brand_name,
      user_name: req.body.user_name,
      password: password,
    });
    const savedBrand = await brand.save();
    res.send('user saved with brand');
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
module.exports = admin_register;
