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
const connection_1 = __importDefault(require("./config/connection"));
// ApolloServer class
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
//two parts of a GraphQL schema
const index_js_1 = require("./schemas/index.js");
const server = new server_1.ApolloServer({
    typeDefs: index_js_1.typeDefs,
    resolvers: index_js_1.resolvers,
});
// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield server.start();
    yield (0, connection_1.default)();
    const PORT = process.env.PORT || 3001;
    const app = (0, express_1.default)();
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.json());
    app.use('/graphql', (0, express4_1.expressMiddleware)(server));
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
});
// Call the async function to start the server
startApolloServer();
