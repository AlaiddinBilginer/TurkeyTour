const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');

router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post('/register', async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = await new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash('success', 'Hoş geldiniz!');
      res.redirect('/');
    });
  } catch (err) {
    req.flash('error', 'Hatalı kayıt işlemi!');
    res.redirect('/register');
  }
});

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post(
  '/login',
  storeReturnTo,
  passport.authenticate('local', {
    failureFlash: 'Hatalı kullanıcı adı veya şifre',
    failureRedirect: '/login',
  }),
  async (req, res) => {
    req.flash('success', 'Başarı ile giriş yapıldı');
    const redirectUrl = res.locals.returnTo || '/';
    res.redirect(redirectUrl);
  }
);

router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Başarı ile oturumu kapattınız');
    res.redirect('/');
  });
});

module.exports = router;
