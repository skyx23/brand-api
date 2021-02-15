const router = require('express').Router();
const dotenv = require('dotenv');
dotenv.config();
const validator = require('../middlewares/validators');
const verify = require('../middlewares/verify');
const {
  getData,
  getbrand,
  admin,
  member
} = require('../controller/index');
router.post('/register', validator, admin.admin_register);

router.post('/login', validator, admin.admin_login);

router.get('/getbrand', getbrand);

router.post('/sub_brand/add', verify, admin.add_sub_brand);

router.post('/member/add', verify, validator, member.add_user);

router.get('/member/get', verify, member.get_user);

router.post('/member/login', validator, member.user_login);

router.post('/subject/add', verify, admin.add_subject);

router.post('/course/add', verify, admin.add_course);

router.post('/member/subject/add', verify, member.add_user_subject);

router.get('/sub_brands', verify, getData);

module.exports = router;
