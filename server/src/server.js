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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const connection_1 = __importDefault(require("./config/connection"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const index_1 = require("./schemas/index");
const models_1 = require("./models");
const auth_1 = require("./utils/auth");
const startApolloServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.default)();
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    const server = new server_1.ApolloServer({
        typeDefs: index_1.typeDefs,
        resolvers: index_1.resolvers,
    });
    yield server.start();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use('/graphql', (0, express4_1.expressMiddleware)(server, {
        context: (_a) => __awaiter(void 0, [_a], void 0, function* ({ req }) {
            const user = (0, auth_1.authenticateToken)(req);
            return { models: { User: models_1.User, Bill: models_1.Bill, Subscription: models_1.Subscription }, user };
        }),
    }));
    const PORT = process.env.PORT || 3001;
    yield new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
});
startApolloServer().catch((err) => console.error('Error starting server:', err));
