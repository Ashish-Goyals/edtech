import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema ({
  name: String,
  email: {type: String, unique: true},
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

UserSchema.pre ('save', async function () {
  if (!this.isModified ('password')) return;
  this.password = await bcrypt.hash (this.password, 10);
});

export default mongoose.models.User || mongoose.model ('User', UserSchema);
