const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleEn: { type: String },
  description: { type: String, required: true },
  descriptionEn: { type: String },
  category: { type: String, required: true },
  image: { type: String, default: '' },
  technologies: [{ type: String }],
  client: { type: String },
  link: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
