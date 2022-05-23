import bcrypt from "bcrypt";
import client from "../../client";
import jwt from "jsonwebtoken";
import { protectedResolver } from "../users.utils";

export default {
  Mutation:{
    editProfile: protectedResolver(
      async (_, {name, id, password: newPassword},
      {loggedInUser, protectResolver})=>{
        let uglyPassword = null;
        if(newPassword){
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const updateUser = await client.user.update({
          where: {
            SN: loggedInUser.SN,
          },
          data: {
            id,
            name,
            ...(uglyPassword && {password: uglyPassword}),
          },
        });
        if(updateUser.id){
          return{
            ok: true,
          };
        } else{
          return{
            ok:false,
            error: "Could not update profile.",
          };
        }
      },
    )
  },
};