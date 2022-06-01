import { protectedResolver } from "../../users/users.utils";
import client from "../../client";
import pubsub from "../../pubsub";
import { NEW_MESSAGE } from "../../constants";

export default {
    Mutation: {
        sendMessage: protectedResolver(
            async(_, { payload, roomSN, userSN }, { loggedInUser }) => {
                let room = null;
                if (userSN) {
                    const user = await client.user.findUnique({
                        where: {
                            SN: userSN,
                        },
                        select: {
                            SN: true,
                        },
                    });
                    if (!user) {
                        return {
                            ok: false,
                            error: "This user does not exist."
                        }
                    }
                    room = await client.room.create({
                        data: {
                            users: {
                                connect: [{
                                        SN: userSN
                                    },
                                    {
                                        SN: loggedInUser.SN
                                    }
                                ]
                            }
                        }
                    });
                } else if (roomSN) {
                    room = await client.room.findFirst({
                        where: {
                            SN: roomSN,
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
                        return {
                            ok: false,
                            error: "Room not found.",
                        };
                    }
                }
                const message = await client.message.create({
                    data: {
                        payload,
                        room: {
                            connect: {
                                SN: room.SN
                            },
                        },
                        user: {
                            connect: {
                                SN: loggedInUser.SN
                            },
                        },
                    },
                });
                pubsub.publish(NEW_MESSAGE, { roomUpdates: {...message } });
                return {
                    ok: true,
                    messageSN: message.SN,
                    roomSN: room.SN
                };
            }
        ),
    },
};