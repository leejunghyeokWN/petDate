import { gql } from "apollo-server-express";

export default gql `
  type Mutation{
    readMessage(SN: Int!): MutationResponse!
  }
`