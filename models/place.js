const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const placeSchema = new Schema({
  title: String,
  image: String,
  description: String,
  location: String,
  price: Number,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

placeSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model('Place', placeSchema);
