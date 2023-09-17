import Fastify from "fastify";
import mongoose from "mongoose";
import "dotenv/config";

import { itemRoutes } from "./routes/item.routes.js";
import { taskRoutes } from "./routes/task.routes.js";
import { userRoutes } from "./routes/user.routes.js";

mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to the database"))
    .catch((e) => console.log("Error connecting to database", e));

const fastify = Fastify({
    logger: true
});

const version = "v1";
fastify.register(itemRoutes, { prefix: `/api/${version}/items` });
fastify.register(taskRoutes, { prefix: `/api/${version}/tasks` });
fastify.register(userRoutes, { prefix: `/api/${version}/users` });

const start = async () => {
    try {
        await fastify.listen({ port: parseInt(process.env.PORT) || 5000 });
        fastify.log.info(
            `Server is running on port ${fastify.server.address().port}`
        );
    } catch (error) {
        console.log(error);
    }
};

start();
