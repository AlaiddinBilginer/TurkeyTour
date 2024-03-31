const express = require('express');
const router = express.Router();
const Place = require('../models/place');
const { placeSchema } = require('../schemas');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const validatePlace = (req, res, next) => {
  const { error } = placeSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

router.get('/new', (req, res) => {
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
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Place.findByIdAndDelete(id);
    res.redirect('/places');
  })
);

router.get(
  '/:id/edit',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const place = await Place.findById(id);
    res.render('places/edit', { place });
  })
);

router.put(
  '/:id',
  validatePlace,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const place = await Place.findByIdAndUpdate(id, { ...req.body.place });
    res.redirect(`/places/${id}`);
  })
);

router.get(
  '/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const place = await Place.findById(id).populate('reviews');
    res.render('places/show', { place });
  })
);

router.post(
  '/',
  validatePlace,
  catchAsync(async (req, res, next) => {
    const place = new Place(req.body.place);
    await place.save();
    res.redirect(`/places/${place._id}`);
  })
);

module.exports = router;
