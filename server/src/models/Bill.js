"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const billSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
    // classes: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Class',
    //   },
    // ],
}, {
    timestamps: true,
});
const Bill = (0, mongoose_1.model)('Bills', billSchema);
exports.default = Bill;
