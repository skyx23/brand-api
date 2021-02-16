const { Subject } = require('../models/schema');
const isAdmin = (req) => {
  const admin = req.client.user.brand_name;
  const sudo_admin = req.client.user.role == 'admin';
  if (!(admin || sudo_admin)) {
    return res.send('you need to be admin to add users');
  }
};

const add_subject = async (req, res) => {
  try {
    isAdmin(req);
    const subject = new Subject({
      name: req.body.name,
    });
    await subject.save();
    res.send(`${req.body.name} has been saved in the database`);
  } catch (error) {
    res.send(error);
  }
};

const update_subject = async (req, res) => {
  try {
    isAdmin(req);
    await Subject.updateOne(
      { name: req.body.existing_name },
      { name: req.body.new_name }
    );
    res.send(
      `Subject name has been updated from ${req.body.existing_name} to ${req.body.new_name}`
    );
  } catch (error) {
    res.send(error);
  }
};

const get_subject = async (req, res) => {
  try {
    const courses = await Subject.find({});
    res.send(courses);
  } catch (error) {
    res.send(error);
  }
};

const delete_subject = async (req, res) => {
  try {
    isAdmin(req);
    const deleted = await Subject.deleteMany({ name: req.body.name });
    if (deleted) return res.send(`${req.body.name} has been deleted`)
  } catch (err) {
    res.send(err);
  }
};

const subject = { add_subject, get_subject, update_subject, delete_subject };
module.exports = subject;
