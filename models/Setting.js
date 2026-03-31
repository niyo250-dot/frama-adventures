import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema({
  logoUrl: { type: String, default: '' },
});

export default mongoose.models.Setting || mongoose.model('Setting', SettingSchema);
