import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import connectDB from './config/connection.js';
import { typeDefs, resolvers } from './schemas/index.js';
import { User, Bill, Subscription } from './models/index.js';
import { authenticateToken } from './utils/auth.js';

const startServer = async () => {
  try {
    await connectDB();
    
    const app = express();
    const httpServer = http.createServer(app);
    const PORT = process.env.PORT || 3001;
    
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    
    
    await server.start();
    
    
    app.use(
      '/graphql',
      cors(),
      express.json(),
      express.urlencoded({ extended: true }),
      expressMiddleware(server, {
        context: async ({ req }) => {
          const user = authenticateToken(req);
          return { models: { User, Bill, Subscription }, user };
        },
      })
    );
    
    
    app.get('/', (_req, res) => {
      res.send('API server is running');
    });
    
    // Start the server
    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();