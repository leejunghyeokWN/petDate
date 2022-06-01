import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
    Mutation: {
        login: async(_, { id, password }) => {
            const user = await client.user.findFirst({ where: { id } });
            if (!user) {
                return {
                    ok: false,
                    error: "User not found.",
                };
            }
            const passwordOk = await bcrypt.compare(password, user.password);
            if (!passwordOk) {
                return {
                    ok: false,
                    error: "Incorrect password.",
                };
            }
            const token = await jwt.sign({ SN: user.SN }, process.env.SECRET_KEY);
            return {
                ok: true,
                token,
            };
        },
    },
};