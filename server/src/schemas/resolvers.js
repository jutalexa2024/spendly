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
const index_1 = require("../models/index");
const auth_1 = require("../utils/auth");
const resolvers = {
    Query: {
        users: () => __awaiter(void 0, void 0, void 0, function* () { return yield index_1.User.find(); }),
        bills: () => __awaiter(void 0, void 0, void 0, function* () { return yield index_1.Bill.find(); }),
        user: (_parent_1, _a) => __awaiter(void 0, [_parent_1, _a], void 0, function* (_parent, { _id }) {
            // Retrieve a profile by its ID
            return yield index_1.User.findOne({ user_id: _id });
        }),
        subscriptions: () => __awaiter(void 0, void 0, void 0, function* () { return yield index_1.Subscription.find(); }),
        userBills: (_parent_1, _a) => __awaiter(void 0, [_parent_1, _a], void 0, function* (_parent, { username }) {
            return yield index_1.Bill.find({ username });
        }),
        bill: (_parent_1, _a) => __awaiter(void 0, [_parent_1, _a], void 0, function* (_parent, { id }) {
            return yield index_1.Bill.findById(id);
        }),
        subscription: (_parent_1, _a) => __awaiter(void 0, [_parent_1, _a], void 0, function* (_parent, { id }) {
            return yield index_1.Subscription.findById(id);
        }),
        me: (_parent, _args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (context.user) {
                // If user is authenticated, return their profile
                return yield index_1.User.findOne({ _id: context.user.user_id });
            }
            // If not authenticated, throw an authentication error
            throw new auth_1.AuthenticationError('Not Authenticated');
        }),
    },
    Mutation: {
        addUser: (_parent_1, _a) => __awaiter(void 0, [_parent_1, _a], void 0, function* (_parent, { input }) {
            const user = yield index_1.User.create(Object.assign({}, input));
            const token = (0, auth_1.signToken)(user.username, user.email, user._id);
            return { token, user };
        }),
        addBill: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { username, category, name, amount, dueDate }) {
            const bill = new index_1.Bill({ username, category, name, amount, dueDate });
            yield bill.save();
            return bill;
        }),
        addSubscription: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { username, cost, renewalDate }) {
            const subscription = new index_1.Subscription({ username, cost, renewalDate });
            yield subscription.save();
            return subscription;
        }),
        login: (_parent_1, _a) => __awaiter(void 0, [_parent_1, _a], void 0, function* (_parent, { email, password }) {
            // Find a profile by email
            const user = yield index_1.User.findOne({ email });
            if (!user) {
                throw new auth_1.AuthenticationError('Invalid credentials, No Email Exists');
            }
            // Check if the provided password is correct
            const correctPw = yield user.isCorrectPassword(password);
            if (!correctPw) {
                throw new auth_1.AuthenticationError('Invalid credentials, Incorrect Password');
            }
            // Sign a JWT token for the authenticated profile
            const token = (0, auth_1.signToken)(user.username, user.email, user.user_id);
            return { token, user };
        }),
    },
};
exports.default = resolvers;
