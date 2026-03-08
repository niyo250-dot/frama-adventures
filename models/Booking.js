import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: Date,
  guests: Number,
  message: String,
  type: { type: String, enum: ['room', 'activity'], default: 'room' },
  confirmed: { type: Boolean, default: false },
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);