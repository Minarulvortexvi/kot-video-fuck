const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const User = require('../models/User');

router.post('/create', async (req, res) => {
  const { name } = req.body;
  const group = new Group({ name, creator: req.user.id, members: [req.user.id] });
  await group.save();
  await User.findByIdAndUpdate(req.user.id, { $push: { groups: group._id } });
  res.json(group);
});

module.exports = router;
