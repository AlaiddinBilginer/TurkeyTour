const Place = require('../models/place');

module.exports.index = async (req, res) => {
  const places = await Place.find({});
  res.render('places/index', { places });
};

module.exports.renderNewForm = (req, res) => {
  res.render('places/new');
};

module.exports.createPlace = async (req, res, next) => {
  const place = new Place(req.body.place);
  place.author = req.user._id;
  await place.save();
  req.flash('success', 'Turistik yer başarı ile eklendi!');
  res.redirect(`/places/${place._id}`);
};

module.exports.showPlace = async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id)
    .populate({ path: 'reviews', populate: { path: 'author' } })
    .populate('author');
  if (!place) {
    req.flash('error', 'Böyle bir turistik alan bulunamadı!');
    return res.redirect('/places');
  }
  res.render('places/show', { place });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  if (!place) {
    req.flash('error', 'Böyle bir turistik alan bulunamadı!');
    return res.redirect('/places');
  }
  res.render('places/edit', { place });
};

module.exports.updatePlace = async (req, res) => {
  const { id } = req.params;
  await Place.findByIdAndUpdate(id, { ...req.body.place });
  req.flash('success', 'Turistik yer başarı ile güncellendi!');
  res.redirect(`/places/${id}`);
};

module.exports.deletePlace = async (req, res) => {
  const { id } = req.params;
  await Place.findByIdAndDelete(id);
  req.flash('success', 'Turistik yer başarı ile silindi!');
  res.redirect('/places');
};
