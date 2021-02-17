const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const { Brand, User, Subject, Course, SubBrand } = require('../models/schema');

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
    console.log(err);
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
    const token = jwt.sign({ _id: user._id, user: user }, process.env.SECRET);
    res.header('token', token).send(`${user.user_name} logged in`);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const profile_pic = async (req, res) => {
  try {
    const file = req.files.profilepic;
    if (!file)
      return res.send({
        status: '0',
        message: 'failure',
        data: 'please upload the file you want as profile pic',
      });
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    const user = await Brand.updateOne(
      { _id: req.client._id },
      { profilepic: result.url }
    );
    if (!user) {
      return res.send({
        status: '0',
        message: 'failure',
        data: 'could not update image',
      });
    }
    fs.unlinkSync(file.tempFilePath);
    res.send({
      status: '1',
      message: 'success',
      data: 'successfully uploaded prfile image',
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: '0',
      message: 'failure',
      data: err,
    });
  }
};

const get_admin = async (req, res) => {
  try {
    const id = req.client._id
    const user = await Brand.find({_id : id}).populate('sub_brand');
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const delete_admin = async (req, res) => {
  try {
    const id = req.client._id;
    const deleted = await Brand.deleteOne({ _id: id });
    if (deleted) {
      res.send('user has been deleted from the database');
    } else {
      res.send('user could not be deleted ');
    }
  } catch (err) {
    console.log(error);
    res.send(error);
  }
};

const update_admin = async (req, res) => {
  try {
    const id = req.client._id;
    const updated = await Brand.updateOne(
      { _id: id },
      { user_name: req.body.user_name }
    );
    if (updated) {
      res.send("your user name has been updated")
    }else {
      res.send("your username could not  be updated")
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const admin = {
  admin_register,
  admin_login,
  profile_pic,
  get_admin,
  delete_admin,
  update_admin
};
module.exports = admin;
