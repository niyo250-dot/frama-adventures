import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  images: [String],
  price: Number,
  duration: String,
});

export default mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);