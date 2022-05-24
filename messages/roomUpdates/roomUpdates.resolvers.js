import { withFilter } from "graphql-subscriptions";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import client from "../../client";

export default {
    Subscription: {
        roomUpdates: {
            subscribe: async(root, args, context, info) => {
                const room = await client.room.findFirst({
                    where: {
                        SN: args.SN,
                        users: {
                            some: {
                                SN: context.loggedInUser.SN,
                            },
                        },
                    },
                    select: {
                        SN: true,
                    },
                });
                if (!room) {
                    throw new Error("You shall not see this!");
                }
                return withFilter(() =>
                    pubsub.asyncIterator(NEW_MESSAGE),
                    async({ roomUpdates }, { SN }, { loggedInUser }) => {
                        if (roomUpdates.roomSN === SN) {
                            const room = await client.room.findFirst({
                                where: {
                                    SN,
                                    users: {
                                        some: {
                                            SN: loggedInUser.SN,
                                        },
                                    },
                                },
                                select: {
                                    SN: true,
                                },
                            });
                            if (!room) {
                                return false;
                            }
                            return true;
                        }
                    }
                )(root, args, context, info);
            },
        },
    },
};