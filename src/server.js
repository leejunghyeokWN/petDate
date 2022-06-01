require("dotenv").config();
import express from "express";
import http from "http";
import logger from "morgan";

import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

import schema from "./schema";
import { getUser } from "./users/users.utils";

async function startServer() {
    const app = express();
    const httpServer = http.createServer(app);

    const subscriptionServer = SubscriptionServer.create({
        schema,
        execute,
        subscribe,
        async onConnect(connectionParams, webSocket, context) {
            const { token } = connectionParams;
            if (!token) {
                throw new Error("토큰이 존재하지 않습니다.");
            }
            const loggedInUser = await getUser(token);
            return { loggedInUser };
        },
    }, { server: httpServer, path: "/graphql" });

    const apollo = new ApolloServer({
        schema,
        context: async({ req }) => {
            if (req) {
                return {
                    loggedInUser: await getUser(req.headers.token),
                };
            }
        },
        subscriptions: {
            onConnect: (params) => {
                console.log(params);
            },
        },
        plugins: [{
            async serverWillStart() {
                return {
                    async drainServer() {
                        subscriptionServer.close();
                    },
                };
            },
        }, ],
    });

    await apollo.start();
    app.use(logger("tiny"));
    app.use("/static", express.static("uploads"));
    app.use(graphqlUploadExpress());
    apollo.applyMiddleware({ app });

    const PORT = process.env.PORT;
    await new Promise((resolve) => httpServer.listen(PORT, resolve));
    console.log(
        `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`
    );
}
startServer();