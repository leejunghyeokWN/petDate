import client from '../client';
export default {
  Query:{
    members: () => client.member.findMany(),
    member: (_, { id }) => client.member.findUnique({where: { id }}),
  },
};