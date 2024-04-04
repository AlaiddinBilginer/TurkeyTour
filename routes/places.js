const express = require('express');
const router = express.Router();
const Place = require('../models/place');
const { isLoggedIn, validatePlace, isAuthor } = require('../middleware');
const catchAsync = require('../utils/catchAsync');

router.get('/new', isLoggedIn, (req, res) => {
  res.render('places/new');
});

router.get(
  '/',
  catchAsync(async (req, res) => {
    const places = await Place.find({});
    res.render('places/index', { places });
  })
);

router.delete(
  '/:id',
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Place.findByIdAndDelete(id);
    req.flash('success', 'Turistik yer başarı ile silindi!');
    res.redirect('/places');
  })
);

router.get(
  '/:id/edit',
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const place = await Place.findById(id);
    if (!place) {
      req.flash('error', 'Böyle bir turistik alan bulunamadı!');
      return res.redirect('/places');
    }
    res.render('places/edit', { place });
  })
);

router.put(
  '/:id',
  isLoggedIn,
  validatePlace,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Place.findByIdAndUpdate(id, { ...req.body.place });
    req.flash('success', 'Turistik yer başarı ile güncellendi!');
    res.redirect(`/places/${id}`);
  })
);

router.get(
  '/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const place = await Place.findById(id)
      .populate({ path: 'reviews', populate: { path: 'author' } })
      .populate('author');
    console.log(place);
    if (!place) {
      req.flash('error', 'Böyle bir turistik alan bulunamadı!');
      return res.redirect('/places');
    }
    res.render('places/show', { place });
  })
);

router.post(
  '/',
  isLoggedIn,
  validatePlace,
  catchAsync(async (req, res, next) => {
    const place = new Place(req.body.place);
    place.author = req.user._id;
    await place.save();
    req.flash('success', 'Turistik yer başarı ile eklendi!');
    res.redirect(`/places/${place._id}`);
  })
);

module.exports = router;
