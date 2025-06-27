const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

router.post('/create', async (req, res) => {
  const { participantId } = req.body;
  const chat = new Chat({ participants: [req.user.id, participantId] });
  await chat.save();
  res.json(chat);
});

module.exports = router;
