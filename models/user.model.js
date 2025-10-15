import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], unique: true },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true, match: [/.+\@.+\..+/, 'Please fill a valid email address'] },
  password: { type: String, required: [true, 'Password is required'] },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);

// For usage in other files to create different users
export default User;