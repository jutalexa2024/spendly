"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = exports.signToken = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const graphql_1 = require("graphql");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authenticateToken = ({ req }) => {
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }
    if (!token) {
        return req;
    }
    try {
        const { data } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2hr' });
        req.user = data;
    }
    catch (err) {
        console.log('Invalid token');
    }
    return req;
};
exports.authenticateToken = authenticateToken;
const signToken = (username, email, _id) => {
    const payload = { username, email, _id };
    const secretKey = process.env.JWT_SECRET_KEY;
    return jsonwebtoken_1.default.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};
exports.signToken = signToken;
class AuthenticationError extends graphql_1.GraphQLError {
    constructor(message) {
        super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
        Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
    }
}
exports.AuthenticationError = AuthenticationError;
;
