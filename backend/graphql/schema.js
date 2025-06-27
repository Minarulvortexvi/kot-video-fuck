const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    displayName: String
    email: String
    profilePicture: String
    videos: [Video]
    groups: [Group]
    chats: [Chat]
  }

  type Video {
    id: ID!
    title: String
    url: String
    description: String
    category: String
    tags: [String]
    likes: [User]
    comments: [Comment]
    views: Int
    isLive: Boolean
  }

  type Comment {
    id: ID!
    text: String
    userId: User
  }

  type Group {
    id: ID!
    name: String
    creator: User
    members: [User]
    videos: [Video]
  }

  type Chat {
    id: ID!
    participants: [User]
    messages: [Message]
  }

  type Message {
    sender: User
    text: String
    createdAt: String
  }

  type Query {
    videos: [Video]
    user(id: ID!): User
    groups: [Group]
    chats: [Chat]
    recommendations: [Video]
  }

  type Mutation {
    uploadVideo(title: String!, description: String!, category: String!, tags: [String], file: Upload!): Video
    createGroup(name: String!): Group
    sendMessage(chatId: ID!, text: String!): Chat
  }
`;

module.exports = typeDefs;
