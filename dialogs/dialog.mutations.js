import client from '../client';
export default {
  Mutation: {
    createDialog: (_, {id, chatroomId, content, authorId, date})=>
      client.dialog.create({
        data:{
          id,
          chatroomId,
          content,
          authorId,
          date
        }
      }),
    deleteDialog: (_, {id})=>
      client.dialog.delete({where: {id}}),
  },
};