import Item from "../models/item.model.js";
import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import { isOwner, isStatus } from "../helpers/index.js"

export async function createTask(request, reply) {
    try {
        const taskItem = await Item.findById(request.body.item);
        if (!taskItem) {
            return reply.status(400).send({ message: "Invalid task item" });
        }

        const taskOwner = await User.findById(request.body.owner);
        if (!taskOwner || !isOwner(taskOwner.role)) {
            return reply.status(400).send({ message: "Invalid task owner" });
        }

        const taskClient = await User.findById(request.body.client);
        if (!taskClient) {
            return reply.status(400).send({ message: "Invalid task client" });
        }

        const task = new Task(request.body);
        await task.save();
        reply.send(task);
    } catch (error) {
        reply.status(400).send(error);
    }
}

export async function getAllTasks(_request, reply) {
    try {
        const tasks = await Task.find()
            .populate("item", Object.keys(Item.schema.obj).join(" "))
            .populate("owner", Object.keys(User.schema.obj).join(" "))
            .populate("client", Object.keys(User.schema.obj).join(" "));
        reply.send(tasks);
    } catch (error) {
        reply.status(400).send(error);
    }
}

export async function getTaskById(request, reply) {
    try {
        const task = await Task.findById(request.params.id);
        if (!task) {
            reply.status(404).send({ message: "Task " + request.params.id + " not found" });
        }
        reply.send(task);
    } catch (error) {
        reply.status(400).send(error);
    }
}

export async function updateTask(request, reply) {
    try {
        if (request.body.status && !isStatus(request.body.status)) {
            return reply.status(400).send({ message: "Invalid task status" });
        }

        if (request.body.item) {
            const taskItem = await Item.findById(request.body.item);
            if (!taskItem) {
                return reply.status(400).send({ message: "Invalid task item" });
            }
        }

        if (request.body.owner) {
            const taskOwner = await User.findById(request.body.owner);
            if (!taskOwner || !isOwner(taskOwner.role)) {
                return reply.status(400).send({ message: "Invalid task owner" });
            }
        }

        if (request.body.client) {
            const taskClient = await User.findById(request.body.client);
            if (!taskClient) {
                return reply.status(400).send({ message: "Invalid task client" });
            }
        }

        const updatedTask = await Task.findByIdAndUpdate(request.params.id, request.body, { new: true });
        reply.send(updatedTask ?? reply.status(400).send({ message: "Invalid task id" }));
    } catch (error) {
        reply.status(500).send(error);
    }
}

export async function deleteTask(request, reply) {
    try {
        const deletedTask = await Task.findByIdAndDelete(request.params.id);

        if (!deletedTask) {
            return reply.status(404).send({ message: "Task " + request.params.id + " not found" });
        }
        reply.status(204).send("");
    } catch (error) {
        reply.status(400).send(error);
    }
}
