import client from '../client';
export default {
  Query:{
    pets: () => client.pet.findMany(),
    pet: (_, { id }) => client.pet.findUnique({where: { id }}),
  },
};