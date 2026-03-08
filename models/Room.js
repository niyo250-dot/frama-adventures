import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  images: [String],
  amenities: [String],
  capacity: Number,
  price: Number,
});

export default mongoose.models.Room || mongoose.model('Room', RoomSchema);