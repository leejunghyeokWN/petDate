import {gql} from "apollo-server";
export default gql`
  type Mutation {
    createAccount(
      id:String!
      name: String!
      password: String!
    ): MutationResponse!
   }
  `