require('dotenv').config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import { getUser, protectResolver } from "./users/users.utils";
import pubsub from "./pubsub";

async function startApolloServer(schema) {
    const server = new ApolloServer({
        schema,
        context: async({ req }) => {
            return {
                loggedInUser: await getUser(req.headers.token),
                protectResolver,
            };
        }
    });
    const PORT = process.env.PORT;

    await server.start();
    const app = express();
    app.use(logger("tiny"));
    server.applyMiddleware({ app });
    app.listen({ port: PORT }, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}/graphql ✅`);
    });
}

startApolloServer(schema);