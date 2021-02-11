const router = require('express').Router();
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('../middlewares/validators')
const { Brand, User, Subject, Course } = require('../schemas/schema');
const verify = require('../middlewares/verify');
const {
  admin_regiseter,
  admin_login,
  add_user,
  get_user,
  user_login,
  add_subject,
  add_course,
  add_user_subject,
} = require('../controller/index');

router.post('/register',validator, admin_regiseter);

router.post('/login',validator, admin_login);

router.post('/user/add', verify, validator, add_user);

router.get('/user/get', verify, get_user);

router.post('/user/login',validator, user_login);

router.post('/subject/add', verify, add_subject);

router.post('/course/add', verify, add_course);

router.post('/user/subject/add', verify, add_user_subject);

module.exports = router;
