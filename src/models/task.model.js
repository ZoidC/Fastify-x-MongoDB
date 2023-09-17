import mongoose from "mongoose";
import User from "./user.model.js";
import { isOwner } from "../helpers/index.js";
import { STATUS } from "../helpers/index.js";

const TaskSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        validate: {
            validator: async (v) => {
                const user = await User.findById(v);
                return isOwner(user.role);
            },
            message: (props) => {
                return `User role must be either 'Admin' or 'Co-Admin'.`;
            }
        },
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: STATUS,
        default: STATUS[0],
    },
},
{
    timestamps: true
});

export default mongoose.model("Task", TaskSchema);
