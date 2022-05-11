import client from '../client';
export default {
  Mutation: {
    createPost: (_, {id, memberId, purpose, location, time})=>
      client.post.create({
        data:{
          id, 
          memberId, 
          purpose, 
          location, 
          time
        }
      }),
    deletePost: (_, {id})=>
      client.post.delete({where: {id}}),
  },
};