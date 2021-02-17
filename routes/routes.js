const router = require('express').Router();
const dotenv = require('dotenv');
dotenv.config();
const validator = require('../middlewares/validators');
const verify = require('../middlewares/verify');
const {
  getData,
  getbrand,
  admin,
  member,
  course,
  subject,
  sub_brand
} = require('../controller/index');



router.get('/getbrand', getbrand);
router.get('/sub_brands', verify, getData);


// admin
router.post('/register', validator, admin.admin_register);
router.post('/login', validator, admin.admin_login);
router.get('/get',verify , admin.get_admin);
router.patch('/profile_pic',verify,admin.profile_pic);
router.patch('/update',verify, admin.update_admin);
router.put('/delete', verify,admin.delete_admin);
// subBrand
router.post('/sub_brand/add', verify, sub_brand.add_subbrand);
router.get('/sub_brand/get',verify, sub_brand.get_subbrand)
router.patch('/sub_brand/update',verify,sub_brand.update_subbrand);
router.put('/sub_brand/delete',verify,sub_brand.delete_subbrand);
// member
router.post('/member/add', verify, validator, member.add_user);
router.get('/member/get', verify, member.get_user);
router.post('/member/login', validator, member.user_login);
router.post('/member/subject/add', verify, member.add_user_subject);
router.put('/member/delete', verify, member.delete_user);
router.put('/member/profile_pic',verify,member.profile_pic);
// subject
router.post('/subject/add', verify, subject.add_subject);
router.get('/subject/get', subject.get_subject)
router.patch('/subject/update',verify,subject.update_subject);
router.put('/subject/delete',verify,subject.delete_subject);
// courses
router.post('/course/add', verify, course.add_course);
router.get('/course/get', course.get_courses)
router.patch('/course/update',verify,course.update_course);
router.put('/course/delete',verify,course.delete__course);


module.exports = router;
