import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import connectDB from './config/connection.js';
import { typeDefs, resolvers } from './schemas/index.js';
import { User, Bill, Subscription } from './models/index.js';
import { authenticateToken } from './utils/auth.js';

const startApolloServer = async () => {
  try {
    await connectDB();

    const app = express();
    const PORT = process.env.PORT || 3001;
    console.log('PORT from env:', process.env.PORT);

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(
      '/graphql',
      expressMiddleware(server, {
        context: async ({ req }) => {
          const user = authenticateToken(req);
          return { models: { User, Bill, Subscription }, user };
        },
      }) as unknown as express.RequestHandler
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

