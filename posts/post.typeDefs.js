import { gql } from "apollo-server";
const typeDefs gql`
type Post{
  id: Int!
  memberId: String! 
  purpose: String!
  location: String!
  time: String!
}
type Query{
  posts: [Post]
  post(id: Int!): Post
}
type Mutation{
  createPost(id: Int!, memberId: String!, purpose: String!, location: String!, time: String!): Post
  deletePost(id: Int!): Post
}
`;