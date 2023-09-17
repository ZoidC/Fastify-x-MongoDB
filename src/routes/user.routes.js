import * as userController from "../controllers/user.controller.js";

export async function userRoutes(fastify, _options) {
    fastify.post("/", userController.createUser);
    fastify.get("/", userController.getAllUsers);
    fastify.get("/:id", userController.getUserById);
    fastify.put("/:id", userController.updateUser);
    fastify.delete("/:id", userController.deleteUser);
}
