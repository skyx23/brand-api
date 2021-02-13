const router = require('express').Router();
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('../middlewares/validators')
const { Brand, User, Subject, Course, SubBrand } = require('../schemas/schema');
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
  add_sub_brand,
  getData
} = require('../controller/index');

router.post('/register',validator, admin_regiseter);

router.post('/login',validator, admin_login);

router.post('/sub_brand/add' , verify , add_sub_brand);

router.post('/member/add', verify, validator, add_user);

router.get('/member/get', verify, get_user);

router.post('/member/login',validator, user_login);

router.post('/subject/add', verify, add_subject);

router.post('/course/add', verify, add_course);

router.post('/member/subject/add', verify, add_user_subject);
router.get('/sub_brands',verify, getData)

module.exports = router;


