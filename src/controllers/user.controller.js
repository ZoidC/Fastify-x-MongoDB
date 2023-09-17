import User from "../models/user.model.js";
import { isRoles } from "../helpers/index.js";

export async function createUser(request, reply) {
    try {
        const user = new User(request.body);
        const result = await user.save();
        reply.send(result);
    } catch (error) {
        reply.status(500).send(error);
    }
}

export async function getAllUsers(_request, reply) {
    try {
        const users = await User.find();
        reply.send(users);
    } catch (error) {
        reply.status(500).send(error);
    }
}

export async function getUserById(request, reply) {
    try {
        const user = await User.findById(request.params.id);
        reply.send(user);
    } catch (error) {
        reply.status(500).send(error);
    }
}

export async function updateUser(request, reply) {
    try {
        if (request.body.role && !isRoles(request.body.role)) {
            return reply.status(400).send({ message: "Invalid user role" });
        }
        
        const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true });
        reply.send(user ?? reply.status(400).send({ message: "Invalid user id" }));
    } catch (error) {
        reply.status(500).send(error);
    }
}

export async function deleteUser(request, reply) {
    try {
        await User.findByIdAndDelete(request.params.id);
        reply.status(204).send("");
    } catch (error) {
        reply.status(500).send(error);
    }
}
