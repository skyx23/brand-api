const Course = require('../models/course');

const add_course = async (req, res) => {
  try {
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
  } catch (error) {
    res.send(error);
  }
};

const update_course = async (req, res) => {
  try {
    const admin = req.client.user.brand_name;
    const sudo_admin = req.client.user.role == 'admin';
    if (!(admin || sudo_admin)) {
      return res.send('you need to be admin to add users');
    }
    await Course.updateOne(
      { name: req.body.existing_name },
      { name: req.body.new_name }
    );
    res.send(
      `course name has been updated from ${req.body.existing_name} to ${req.body.new_name} `
    );
  } catch (error) {
    res.send(error);
  }
};

const get_courses = async (req, res) => {
  try {
    const courses = await Course.find({}).populate('subject');
    res.send(courses);
  } catch (error) {
    res.send(error);
  }
};

const delete__course = async (req, res) => {
  try {
    const admin = req.client.user.brand_name;
    const sudo_admin = req.client.user.role == 'admin';
    if (!(admin || sudo_admin)) {
      return res.send('you need to be admin to add users');
    }
    const courses = await Course.deleteMany({ name: req.body.name });
    res.send("Course deleted")
  } catch (error) {
    res.send(error);
  }
};

const course = { add_course, update_course, get_courses, delete__course };
module.exports = course;
