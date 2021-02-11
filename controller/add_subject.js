const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Brand, User, Subject, Course } = require('../schemas/schema');
const add_subject = async (req, res) => {
  try {
    const admin = await Brand.findOne({ _id: req.client._id });
    if (!admin) {
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
module.exports = add_subject;
