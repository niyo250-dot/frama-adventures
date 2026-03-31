import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  price: { type: Number, default: 0 },
  images: { type: [String], default: [] },
});

export default mongoose.models.Event || mongoose.model('Event', EventSchema);
