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

  const get_user = async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  const add_user_subject = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.client._id });
      if (user.role == 'teacher') {
        const subject = await Subject.findOne({ name: req.body.Subject_name });
        const add = await User.updateOne(
          { _id: req.client._id },
          { $push: { subject: subject._id } }
        );
        return res.send(`${req.body.Subject_name} added to your profile`);
      } else {
        const course = await Course.findOne({ name: req.body.Subject_name });
        const add = await User.updateOne(
          { _id: req.client._id },
          { $push: { subject: course._id } }
        );
        return res.send(
          `${req.body.Subject_name} has been added to your profile`
        );
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  const member = {add_user,user_login,get_user,add_user_subject};
module.exports = member
