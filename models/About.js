import mongoose from 'mongoose';

const AboutSchema = new mongoose.Schema({
  whoWeAre: String,
  ourTeam: String,
});

export default mongoose.models.About || mongoose.model('About', AboutSchema);