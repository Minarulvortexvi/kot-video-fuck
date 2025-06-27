const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const User = require('../models/User');
const Notification = require('../models/Notification');

router.get('/recommend', async (req, res) => {
  const user = await User.findById(req.user.id);
  const videos = await Video.find({ category: { $in: user.preferences } }).populate('userId');
  res.json(videos);
});

router.post('/:id/like', async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video.likes.includes(req.user.id)) {
    video.likes.push(req.user.id);
    await video.save();

    const notification = new Notification({
      userId: video.userId,
      message: `${req.user.displayName} liked your video`,
      type: 'like'
    });
    await notification.save();

    io.emit('notification', notification);
  }
  res.json(video);
});

module.exports = router;
