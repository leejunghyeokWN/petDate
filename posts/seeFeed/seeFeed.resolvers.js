import client from "../../client";

export default {
    Query:{
      seeFeed: (_,{offset}) =>
      client.post.findMany({
        skip:offset,
      })
    },
};  