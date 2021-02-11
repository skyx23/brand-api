const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Brand, User, Subject, Course } = require('../schemas/schema');
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
module.exports = add_user_subject;
