import client from "../client";

export default {
  Query: {
    users: (_, {}) =>
      client.user.findMany(),
  },
  User: {
    totalPets: ()=>3,
  }
};