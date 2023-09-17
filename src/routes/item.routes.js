import * as itemController from "../controllers/item.controller.js";

export async function itemRoutes(fastify, _options) {
    fastify.post("/", itemController.createItem);
    fastify.get("/", itemController.getAllItems);
    fastify.get("/:id", itemController.getItemById);
    fastify.put("/:id", itemController.updateItem);
    fastify.delete("/:id", itemController.deleteItem);
}
