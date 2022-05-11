import client from '../client';
export default {
  Mutation: {
    createMember: (_, {id, pw, name, petId, sex, age, introduction})=>
      client.member.create({
        data:{
          id,
          pw,
          name,
          petId,
          sex,
          age,
          introduction
        }
      }),
    deleteMember: (_, {id})=>
      client.member.delete({where: {id}}),
  },
};