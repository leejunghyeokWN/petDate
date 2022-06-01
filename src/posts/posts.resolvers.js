
   
import client from "../client";

export default {
  Post: {
    user: ({ userSN }) => client.user.findUnique({ where: { SN: userSN } }),
  }
}