import * as taskController from "../controllers/task.controller.js";

export async function taskRoutes(fastify, _options) {
    fastify.post("/", taskController.createTask);
    fastify.get("/", taskController.getAllTasks);
    fastify.get("/:id", taskController.getTaskById);
    fastify.put("/:id", taskController.updateTask);
    fastify.delete("/:id", taskController.deleteTask);
}
