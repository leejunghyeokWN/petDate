import client from "../client";

export default {
    Room: {
        users: ({ SN }) => client.room.findUnique({ where: { SN } }).users(),
        messages: ({ SN }) => client.message.findMany({
            where: {
                roomSN: SN,
            },
        }),
        unreadTotal: ({ SN }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return 0;
            }
            return client.message.count({
                where: {
                    read: false,
                    roomSN: SN,
                    user: {
                        SN: {
                            not: loggedInUser.SN,
                        },
                    },
                },
            });
        },
    },
    Message: {
        user: ({ SN }) => client.message.findUnique({ where: { SN } }).user(),
    }
};