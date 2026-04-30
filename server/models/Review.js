const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  college:  { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: { type: String, default: 'Anonymous' },
  rating:   { type: Number, required: true, min: 1, max: 5 },
  comment:  { type: String, required: true },
  batch:    { type: String },
  course:   { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
