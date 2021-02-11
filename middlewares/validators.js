const { check, validationResult } = require('express-validator');

const validator = [
  check('user_name').exists().isLength({ min: 3 }),
  check('password').exists().isLength({ min: 8 }),
  (req,res,next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.send(errors)
      }
      next();
  }
];
module.exports = validator;
