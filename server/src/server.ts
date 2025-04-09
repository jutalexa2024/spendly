import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import connectDB from './config/connection.js';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';

const startApolloServer = async () => {
  await connectDB();
  
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    expressMiddleware(server, {
      context: async ({ req }) => {
        return authenticateToken({ req: req as any });
      }
    })
  );
  const PORT = process.env.PORT || 3001;
  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, () => resolve()));

  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
};

startApolloServer().catch((err) => console.error('Error starting server:', err));