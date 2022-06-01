import client from "../client";
import { protectedResolver } from "./users.utils";

export default {
  Query: {
    getMe: protectedResolver((_, __, {loggedInUser}) =>
      client.user.findUnique({
        where:{
          SN:loggedInUser.SN,
        }
      }) 
    ),
    users: (_, {}) =>
      client.user.findMany(),
  },
  User: {
    totalPets: ()=>3,
  }
};