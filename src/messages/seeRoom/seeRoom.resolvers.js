import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Query: {
        seeRoom: protectedResolver((_, { SN }, { loggedInUser }) =>
            client.room.findFirst({
                where: {
                    SN,
                    users: {
                        some: {
                            SN: loggedInUser.SN,
                        },
                    },
                },
            })
        ),
    },
};