import {gql} from "apollo-server";
export default gql`
  type CreateAccount{
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      id:String!
      name: String!
      password: String!
    ): User
   }
  `