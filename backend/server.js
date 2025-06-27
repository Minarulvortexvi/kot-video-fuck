const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
require('dotenv').config();
require('./config/db');
require('./config/firebase');
require('./config/passport');

const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/video');
const userRoutes = require('./routes/user');
const groupRoutes = require('./routes/group');
const eventRoutes = require('./routes/event');
const notificationRoutes = require('./routes/notification');
const chatRoutes = require('./routes/chat');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

const apolloServer = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ user: req.user }) });
await apolloServer.start();
apolloServer.applyMiddleware({ app });

app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/chat', chatRoutes);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('joinRoom', (room) => socket.join(room));
  socket.on('message', (msg) => io.to(msg.room).emit('message', msg));
  socket.on('disconnect', () => console.log('User disconnected'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
