import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
export default {
  Mutation: {
    uploadPost: protectedResolver(
      async (_, { content, time, location }, { loggedInUser }) => {
        const newPost = await client.post.create({
          data: {
            content,
            time,
            location,
            user: {
              connect: {
                SN: loggedInUser.SN,
              },
            }
          }
        })
        return {
          ok:true,
        };
      }
  )}
}