const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
  profilePicture: String,
  socialLinks: [String],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  preferences: { type: Map, of: String },
  isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);
