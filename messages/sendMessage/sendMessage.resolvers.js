import {protectedResolver} from "../../users/users.utils";
import client from "../../client";

export default{
  Mutation: {
    sendMessage: protectedResolver(
      async(_, {payload, roomSN, userSN}, {loggedInUser})=>{
        let room = null;
        if(userSN){
          const user = await client.user.findUnique({
            where:{
              SN: userSN,
            },
            select:{
              SN: true,
            },
          });
          if(!user){
            return {
              ok:false,
              error: "This user does not exist."
            }
          }
          room = await client.room.create({
            data:{
              users:{
                connect:[{
                  SN:userSN
                },
                {
                  SN:loggedInUser.SN
                }
              ]
              }
            }
          });
        } else if(roomId){
          room = await client.room.findUnique({
            where:{
              SN: roomSN,
            },
            select:{
              SN: true,
            },
          });
          if(!room){
            return{
              ok:false,
              error: "Room not found.",
            };
          }
        }

        await client.message.create({
          data:{
            payload,
            room:{
              connect:{
                SN: room.SN
              },
            },
            user:{
              connect: {
                SN: loggedInUser.SN
              },
            },
          },
        });
        return{
          ok:true,
        };
      }
    ),
  },
};