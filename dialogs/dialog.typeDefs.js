import { gql } from "apollo-server";
const typeDefs gql`
type Dialog{
  id: Int!
  chatroomId: Int!
  content: String!
  authorId: String!
  date: String!
}
type Query{
  dialogs: [Dialog]
  dialog(id: Int!): Dialog
}
type Mutation{
  createDialog(id: Int!, chatroomId: Int!, content: String!, authorId: String!, date: String!): Dialog
  deleteDialog(id: Int!): Dialog
}
`;