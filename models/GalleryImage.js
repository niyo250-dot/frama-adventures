import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: String,
});

export default mongoose.models.GalleryImage || mongoose.model('GalleryImage', GallerySchema);