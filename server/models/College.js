const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  duration: String,
  fees: Number,
  seats: Number,
});

const placementSchema = new mongoose.Schema({
  avgPackage: String,
  highestPackage: String,
  placementRate: String,
  topRecruiters: [String],
});

const collegeSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  location:    { type: String, required: true },
  city:        { type: String },
  state:       { type: String },
  type:        { type: String, enum: ['Public', 'Private', 'Deemed', 'Autonomous'], default: 'Private' },
  accreditation: { type: String },
  ranking:     { type: Number },
  rating:      { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  fees:        { type: Number },
  description: { type: String },
  image:       { type: String },
  logo:        { type: String },
  established: { type: Number },
  website:     { type: String },
  phone:       { type: String },
  email:       { type: String },
  courses:     [courseSchema],
  facilities:  [String],
  placements:  placementSchema,
  tags:        [String],
  featured:    { type: Boolean, default: false },
  admissionProcess: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('College', collegeSchema);
