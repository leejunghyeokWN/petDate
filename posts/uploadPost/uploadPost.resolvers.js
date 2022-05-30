import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
export default {
  Mutation: {
    uploadPost: protectedResolver(
      async (_, { content }, { loggedInUser }) => {
        const newPost = await client.post.create({
          data: {
            content,
            user: {
              connect: {
                SN: loggedInUser.SN,
              },
            }
          }
        })
        console.log(newPost);
        return {
          ok:true,
        };
      }
  )}
}