const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Brand, User, Subject, Course } = require('../schemas/schema');
const add_course = async (req, res) => {
  const admin = req.client.user.brand_name;
  const sudo_admin = req.client.user.role == 'admin';
  if (!(admin || sudo_admin)) {
    return res.send('you need to be admin to add users');
  }
  if (await Course.findOne({ name: req.body.name })) {
    return res.send('course with a same name already exists');
  }
  const course = new Course({
    name: req.body.name,
    subject: req.body.subject,
  });
  await course.save();
  res.send(`${req.body.name} has been saved as a course`);
};
module.exports = add_course;
