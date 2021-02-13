const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Brand, User, Subject, Course, SubBrand } = require('../schemas/schema');
const add_user = async (req, res) => {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.send('password do not match');
    }
    const admin = req.client.user.brand_name;
    const sudo_admin = req.client.user.role == 'admin';
    if (!(admin || sudo_admin)) {
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
    const savedUser = await user.save(); 
    await SubBrand.updateOne({subBrand_name : req.body.subBrand_name},{
      $push : { user : savedUser._id}
    })
    res.send(`${req.body.name} has been saved as a ${req.body.role}`);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
module.exports = add_user;
