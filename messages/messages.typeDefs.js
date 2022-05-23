import { gql } from "apollo-server-express";

export default gql `
  type Message{
    SN: Int!
    payload:String!
    user: User!
    room: Room!
    read: Boolean!
    createdAt: String!
    updatedAt: String!
  
  }
  type Room{
    SN: Int!
    users: [User]
    messages: [Message]
    unreadTotal: Int!
    createdAt: String!
    updatedAt: String!
  }
`