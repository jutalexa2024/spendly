"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../models/index.js");
const resolvers = {
    Query: {
        users: () => __awaiter(void 0, void 0, void 0, function* () { return yield index_js_1.User.find(); }),
        bills: () => __awaiter(void 0, void 0, void 0, function* () { return yield index_js_1.Bill.find(); }),
        subscriptions: () => __awaiter(void 0, void 0, void 0, function* () { return yield index_js_1.Subscription.find(); }),
    },
    Mutation: {
        addUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { username, email, password }) {
            const user = new index_js_1.User({ username, email, password });
            yield user.save();
            return user;
        }),
        addBill: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { username, category, name, amount, dueDate }) {
            const bill = new index_js_1.Bill({ username, category, name, amount, dueDate });
            yield bill.save();
            return bill;
        }),
        addSubscription: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { username, cost, renewalDate }) {
            const subscription = new index_js_1.Subscription({ username, cost, renewalDate });
            yield subscription.save();
            return subscription;
        }),
    },
};
exports.default = resolvers;
