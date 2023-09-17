import mongoose from "mongoose";
import { ROLES } from "../helpers/index.js";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    role: {
        type: String,
        enum: ROLES,
        default: ROLES[0],
    },
},
{
    timestamps: true
});

export default mongoose.model("User", UserSchema);
