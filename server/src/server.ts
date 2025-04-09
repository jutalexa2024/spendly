import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import connectDB from './config/connection.js';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';
import { User, Bill, Subscription } from './models/index.js'; // Assuming these models are exported from here

const startApolloServer = async () => {
  try {
    await connectDB();
    
    const app = express();
    const httpServer = http.createServer(app);
    const PORT = process.env.PORT || 3001;
    
    console.log('PORT from env:', process.env.PORT);
    
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    
    await server.start();
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    app.use(
      '/graphql',
      cors(),
      bodyParser.json(),
      expressMiddleware(server, {
        context: async ({ req }) => {
          
          const user = authenticateToken(req as any);
          return { models: { User, Bill, Subscription }, user };
        },
      }) as express.RequestHandler
    );
    
    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, () => resolve()));
    
    console.log(`🚀 API server running on port ${PORT}`);
    console.log(`GraphQL available at http://localhost:${PORT}/graphql`);
    
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

startApolloServer().catch((err) => console.error('Error starting server:', err));