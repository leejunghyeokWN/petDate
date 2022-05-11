import { gql } from "apollo-server";
const typeDefs gql`
type Chatroom{
  id: Int!
  firMemberId: String!
  secMemberId: String!
}
type Query{
  chatrooms: [Chatroom]
  chatroom(id: Int!): Chatroom
}
type Mutation{
  createChatroom(id: Int!, firMemberId: String!, secMemberId: String!): Chatroom
  deleteChatroom(id: Int!): Chatroom
}
`;