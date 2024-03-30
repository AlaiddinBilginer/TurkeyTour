const Joi = require('joi');

module.exports.placeSchema = Joi.object({
  place: Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.number().required().min(0),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().max(5).min(1).required(),
    body: Joi.string().required(),
  }).required(),
});
