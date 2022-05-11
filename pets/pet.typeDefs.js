import { gql } from "apollo-server";
const typeDefs gql`
type Pet{
  id: Int!
  memberId: String! 
  name: String!
  species: String!
  sex: Int!
  weight: Int!
}
type Query{
  pets: [Pet]
  pet(id: String!): Pet
}
type Mutation{
  createPet(id: Int!, memberId: String!, name: String!, species: String!, sex: Int!, weight: Int!): Pet
  deletePet(id: Int!): Pet
}
`;