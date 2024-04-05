const express = require('express');
const router = express.Router();
const places = require('../controllers/places');
const { isLoggedIn, validatePlace, isAuthor } = require('../middleware');
const catchAsync = require('../utils/catchAsync');

router
  .route('/')
  .get(catchAsync(places.index))
  .post(isLoggedIn, validatePlace, catchAsync(places.createPlace));

router.get('/new', isLoggedIn, places.renderNewForm);

router
  .route('/:id')
  .get(catchAsync(places.showPlace))
  .put(isLoggedIn, validatePlace, isAuthor, catchAsync(places.updatePlace))
  .delete(isLoggedIn, isAuthor, catchAsync(places.deletePlace));

router.get(
  '/:id/edit',
  isLoggedIn,
  isAuthor,
  catchAsync(places.renderEditForm)
);

module.exports = router;
