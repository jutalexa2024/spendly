import express from 'express';
import http from 'http';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser';
import connectDB from './config/connection.js';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';
import { User, Bill, Subscription } from './models/index.js';

const startApolloServer = async () => {
  try {
    await connectDB();
    
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    
    await server.start();
    
    const PORT = process.env.PORT || 3001;
    console.log('PORT from env:', process.env.PORT);
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    
    app.use(
      '/graphql',
      cors(),
      bodyParser.json(),
      expressMiddleware(server, {
        context: async ({ req }) => {
          const user = authenticateToken(req);
          return { models: { User, Bill, Subscription }, user };
        },
      })
    );
    
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
      console.log(`GraphQL available at http://localhost:${PORT}/graphql`);
    });
    
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

startApolloServer();