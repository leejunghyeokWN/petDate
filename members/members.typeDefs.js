import { gql } from "apollo-server";
const typeDefs gql`
type Member{
  id: String!
  pw: String!
  name: String!
  petId: [Int]!
  sex: Int!
  age: Int!
  introduction: String!
}
type Query{
  members: [Member]
  member(id: String!): Member
}
type Mutation{
  createMember(id: String!, pw: String!, name: String!, petId: [Int]!, sex: Int!, age: Int!, introduction: String!): Member
  deleteMember(id: String!): Member
}
`;