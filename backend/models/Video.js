const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  url: String,
  title: String,
  description: String,
  category: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  isLive: { type: Boolean, default: false },
  tags: [String]
});

module.exports = mongoose.model('Video', VideoSchema);
