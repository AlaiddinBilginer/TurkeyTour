const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const catchAsync = require('../utils/catchAsync');

router
  .route('/register')
  .get(users.renderRegisterForm)
  .post(catchAsync(users.register));

router
  .route('/login')
  .get(users.renderLoginForm)
  .post(
    storeReturnTo,
    passport.authenticate('local', {
      failureFlash: 'Hatalı kullanıcı adı veya şifre',
      failureRedirect: '/login',
    }),
    users.login
  );

router.get('/logout', users.logout);

module.exports = router;
