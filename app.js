const express = require('express');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ExpressError = require('./utils/ExpressError');

// Routes
const places = require('./routes/places');
const reviews = require('./routes/reviews');

mongoose
  .connect('mongodb://127.0.0.1:27017/TurkeyTour')
  .then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home');
});

app.use('/places', places);
app.use('/places/:id/reviews', reviews);

app.all('*', (req, res, next) => {
  next(new ExpressError(404, 'Sayfa Bulunamadı!'));
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Bir şeyler yanlış gitti!' } = err;
  res.status(status).render('error', { err });
});

app.listen(3000, () => {
  console.log('Serving on port 3000');
});
