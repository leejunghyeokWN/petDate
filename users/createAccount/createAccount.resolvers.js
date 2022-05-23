import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (_, {id, name, password}) =>{
      try{
        const existingUser = await client.user.findFirst({
          where: {
            OR:[
              {
                name,
              },
              {
                id,
              },
            ],
          },
        });
        if(existingUser){
          throw new Error("This username/password is already taken.");
        }
        const uglyPassword = await bcrypt.hash(password,10);
        return client.user.create({
          data:{
            id,
            name,
            password: uglyPassword,
          },
        });
      } catch(e){
        return e;
      }
    },
  },
};
