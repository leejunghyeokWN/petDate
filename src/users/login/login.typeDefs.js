import { gql } from "apollo-server";

export default gql`
  type LoginResult{
    ok: Boolean!
    token: String
    error: String
    SN: Int
  }
  type Mutation {
    login(id:String!, password:String!): LoginResult!
   }
`;
