import client from '../client';
export default {
  Query:{
    chatrooms: () => client.chatroom.findMany(),
    chatroom: (_, { id }) => client.chatroom.findUnique({where: { id }}),
  },
};