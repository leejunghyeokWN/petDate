import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        readMessage: protectedResolver(async(_, { SN }, { loggedInUser }) => {
            const message = await client.message.findFirst({
                where: {
                    SN,
                    userSN: {
                        not: loggedInUser.SN,
                    },
                    room: {
                        users: {
                            some: {
                                SN: loggedInUser.SN,
                            },
                        },
                    },
                },
                select: {
                    SN: true,
                }
            });
            if (!message) {
                return {
                    ok: false,
                    error: "Message not found."
                };
            }
            await client.message.update({
                where: {
                    SN,
                },
                data: {
                    read: true,
                },
            });
            return {
                ok: true,
            };
        }),
    },
};