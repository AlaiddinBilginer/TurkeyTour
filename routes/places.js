const express = require('express');
const router = express.Router();
const places = require('../controllers/places');
const { isLoggedIn, validatePlace, isAuthor } = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router
  .route('/')
  .get(catchAsync(places.index))
  .post(isLoggedIn, upload.array('image'), validatePlace, catchAsync(places.createPlace));

router.get('/new', isLoggedIn, places.renderNewForm);

router
  .route('/:id')
  .get(catchAsync(places.showPlace))
  .put(isLoggedIn, isAuthor, upload.array('image'), validatePlace, catchAsync(places.updatePlace))
  .delete(isLoggedIn, isAuthor, catchAsync(places.deletePlace));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(places.renderEditForm));

module.exports = router;
