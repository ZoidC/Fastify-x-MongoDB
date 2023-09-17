import Item from "../models/item.model.js";

export async function createItem(request, reply) {
    try {
        const item = new Item(request.body);
        const result = await item.save();
        reply.send(result);
    } catch (error) {
        reply.status(500).send(error);
    }
}

export async function getAllItems(_request, reply) {
    try {
        const items = await Item.find();
        reply.send(items);
    } catch (error) {
        reply.status(500).send(error);
    }
}

export async function getItemById(request, reply) {
    try {
        const item = await Item.findById(request.params.id);
        reply.send(item);
    } catch (error) {
        reply.status(500).send(error);
    }
}

export async function updateItem(request, reply) {
    try {
        const item = await Item.findByIdAndUpdate(request.params.id, request.body, { new: true });
        reply.send(item ?? reply.status(400).send({ message: "Invalid item id" }));
    } catch (error) {
        reply.status(500).send(error);
    }
}

export async function deleteItem(request, reply) {
    try {
        await Item.findByIdAndDelete(request.params.id);
        reply.status(204).send("");
    } catch (error) {
        reply.status(500).send(error);
    }
}
