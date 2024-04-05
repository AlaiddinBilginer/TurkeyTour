const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
  res.render('users/register');
};

module.exports.register = async (req, res, next) => {
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
};

module.exports.renderLoginForm = (req, res) => {
  res.render('users/login');
};

module.exports.login = async (req, res) => {
  req.flash('success', 'Başarı ile giriş yapıldı');
  const redirectUrl = res.locals.returnTo || '/';
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Başarı ile oturumu kapattınız');
    res.redirect('/');
  });
};
