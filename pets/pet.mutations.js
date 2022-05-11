import client from '../client';
export default {
  Mutation: {
    createPet: (_, {id, memberId, name, species, sex, weight})=>
      client.pet.create({
        data:{
          id, 
          memberId, 
          name, 
          species, 
          sex, 
          weight
        }
      }),
    deletePet: (_, {id})=>
      client.pet.delete({where: {id}}),
  },
};