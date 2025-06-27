const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: String,
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Group', GroupSchema);
