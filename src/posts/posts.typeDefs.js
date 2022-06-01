import { gql } from "apollo-server-express";

export default gql `
  type Post{
    SN: Int!
    user: User!
    isMine: Boolean!
    content: String!
    time: String!
    location: String!
    createdAt: String!
    updatedAt: String!
  }
`