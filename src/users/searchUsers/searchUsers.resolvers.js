import client from "../../client"

export default{
  Query:{
    searchUsers: async(_, {keyword})=>
    client.user.findMany({where: {
        name:{
          startsWith: keyword.toLowerCase(),
        },
      },
    })
  }
}