const Place = require('../models/place');
const Review = require('../models/review');
const moment = require('moment');
require('moment/locale/tr');

module.exports.createReview = async (req, res) => {
    const place = await Place.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    review.turkishDate = moment(review.createdAt).locale('tr').format('LLL');
    place.reviews.push(review);
    await review.save();
    await place.save();
    req.flash('success', 'Yorumunuz başarı ile eklendi!');
    res.redirect(`/places/${place._id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Place.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Yorumunuz başarı ile silindi');
    res.redirect(`/places/${id}`);
};
