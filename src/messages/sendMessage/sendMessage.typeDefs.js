import { gql } from "apollo-server-express";

export default gql`
  type MutationResponse{
    ok:Boolean!
    error:String
  }
  type SendResponse{
    ok:Boolean!
    error:String
    messageSN:Int
    roomSN:Int
  }
  type Mutation{
    sendMessage(payload:String!, roomSN:Int, userSN:Int): SendResponse!
  }
`;