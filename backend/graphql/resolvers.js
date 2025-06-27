const Video = require('../models/Video');
const User = require('../models/User');
const Group = require('../models/Group');
const Chat = require('../models/Chat');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'us-east-1'
});

const s3 = new AWS.S3();

const resolvers = {
  Query: {
    videos: async () => await Video.find().populate('userId'),
    user: async (_, { id }) => await User.findById(id).populate('videos groups chats'),
    groups: async () => await Group.find().populate('creator members'),
    chats: async (_, __, { user }) => await Chat.find({ participants: user.id }).populate('participants'),
    recommendations: async (_, __, { user }) => {
      // Placeholder for TensorFlow.js-based recommendation
      return await Video.find({ category: { $in: user.preferences } }).populate('userId');
    }
  },
  Mutation: {
    uploadVideo: async (_, { title, description, category, tags, file }, { user }) => {
      const { createReadStream, filename } = await file;
      const params = {
        Bucket: 'kot-video-bucket',
        Key: `${Date.now()}-${filename}`,
        Body: createReadStream()
      };
      const upload = await s3.upload(params).promise();
      const video = new Video({ userId: user.id, url: upload.Location, title, description, category, tags });
      await video.save();
      await User.findByIdAndUpdate(user.id, { $push: { videos: video._id } });
      return video;
    },
    createGroup: async (_, { name }, { user }) => {
      const group = new Group({ name, creator: user.id, members: [user.id] });
      await group.save();
      await User.findByIdAndUpdate(user.id, { $push: { groups: group._id } });
      return group;
    },
    sendMessage: async (_, { chatId, text }, { user }) => {
      const chat = await Chat.findById(chatId);
      chat.messages.push({ sender: user.id, text });
      await chat.save();
      return chat;
    }
  }
};

module.exports = resolvers;
