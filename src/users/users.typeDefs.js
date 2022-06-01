import { gql } from "apollo-server";

export default gql`
  type User {
    SN:Int!
    id:String!
    name:String!
    password:String!
    totalPets: Int
  }
  type Query {
    users: [User]
    getMe: User!
  }
`;
