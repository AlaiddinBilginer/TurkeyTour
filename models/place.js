const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: String,
  image: String,
  description: String,
  location: String,
  price: Number,
});

module.exports = mongoose.model('Place', placeSchema);
