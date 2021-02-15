const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Brand, User, Subject, Course } = require('../schemas/schema');

const admin_register = async (req, res) => {
    try {
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
      res.send(err);
    }
  };

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
      const token = jwt.sign({ _id: user._id,user : user}, process.env.SECRET);
      res.header('token', token).send(`${user.user_name} logged in`);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  };

  const add_course = async (req, res) => {
    const admin = req.client.user.brand_name;
    const sudo_admin = req.client.user.role == 'admin';
    if (!(admin || sudo_admin)) {
      return res.send('you need to be admin to add users');
    }
    const course = new Course({
      name: req.body.name,
      subject: req.body.subject,
    });
    await course.save();
    res.send(`${req.body.name} has been saved as a course`);
  };

  const add_subject = async (req, res) => {
    try {
      const admin = req.client.user.brand_name;
      const sudo_admin = req.client.user.role == 'admin';
      if (!(admin || sudo_admin)) {
        return res.send('you need to be admin to add users');
      }
      const subject = new Subject({
        name: req.body.subject,
      });
      await subject.save();
      res.send(`${req.body.subject} has beem saved in the database`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  };

  const add_sub_brand = async (req, res) => {
    try {
      const admin = req.client.user.brand_name;
      if (!admin) {
        return res.send('you need to be admin to add users');
      }
      const newSubBrand = new SubBrand({
        subBrand_name: req.body.subBrand_name,
        description: req.body.description,
      });
      const saved = await newSubBrand.save();
      await Brand.updateMany(
        { brand_name: admin.brand_name },
        {
          $push: { sub_brand: saved._id },
        }
      );
      res.send(
        `${req.body.subBrand_name} add to ${admin.brand_name} as a sub brand`
      );
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  };

  const admin = {admin_register,admin_login,add_course,add_subject,add_sub_brand}
  module.exports = admin;