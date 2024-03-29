const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const { placeSchema } = require('./schemas');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const Place = require('./models/place');

mongoose
  .connect('mongodb://127.0.0.1:27017/TurkeyTour')
  .then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.log('MongoDB connection error:', err));

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const validatePlace = (req, res, next) => {
  const { error } = placeSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/places/new', (req, res) => {
  res.render('places/new');
});

app.get(
  '/places',
  catchAsync(async (req, res) => {
    const places = await Place.find({});
    res.render('places/index', { places });
  })
);

app.delete(
  '/places/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Place.findByIdAndDelete(id);
    res.redirect('/places');
  })
);

app.get(
  '/places/:id/edit',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const place = await Place.findById(id);
    res.render('places/edit', { place });
  })
);

app.put(
  '/places/:id',
  validatePlace,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const place = await Place.findByIdAndUpdate(id, { ...req.body.place });
    res.redirect(`/places/${id}`);
  })
);

app.get(
  '/places/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const place = await Place.findById(id);
    res.render('places/show', { place });
  })
);

app.post(
  '/places',
  validatePlace,
  catchAsync(async (req, res, next) => {
    const place = new Place(req.body.place);
    await place.save();
    res.redirect(`/places/${place._id}`);
  })
);

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
