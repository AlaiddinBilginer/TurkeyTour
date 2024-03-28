const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
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

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/places/new', (req, res) => {
  res.render('places/new');
});

app.get('/places', async (req, res) => {
  const places = await Place.find({});
  res.render('places/index', { places });
});

app.delete('/places/:id', async (req, res) => {
  const { id } = req.params;
  await Place.findByIdAndDelete(id);
  res.redirect('/places');
});

app.get('/places/:id/edit', async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  res.render('places/edit', { place });
});

app.put('/places/:id', async (req, res) => {
  const { id } = req.params;
  const place = await Place.findByIdAndUpdate(id, { ...req.body.place });
  res.redirect(`/places/${id}`);
});

app.get('/places/:id', async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  res.render('places/show', { place });
});

app.post('/places', async (req, res) => {
  const place = new Place(req.body.place);
  await place.save();
  res.redirect(`/places/${place._id}`);
});

app.all('*', (req, res) => {
  res.send('Page not found');
});

app.listen(3000, () => {
  console.log('Serving on port 3000');
});
