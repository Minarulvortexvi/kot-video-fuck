const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');

router.post('/create', async (req, res) => {
  const { title, description, date } = req.body;
  const event = new Event({ title, description, date, creator: req.user.id });
  await event.save();
  await User.findByIdAndUpdate(req.user.id, { $push: { events: event._id } });
  res.json(event);
});

module.exports = router;
