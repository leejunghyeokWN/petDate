import client from '../client';
export default {
  Mutation: {
    createChatroom: (_, {id, firMemberId, secMemberId})=>
      client.chatroom.create({
        data:{
          id,
          firMemberId,
          secMemberId
        }
      }),
    deleteChatroom: (_, {id})=>
      client.chatroom.delete({where: {id}}),
  },
};