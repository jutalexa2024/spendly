"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    user_id: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
}, { timestamps: true });
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;
