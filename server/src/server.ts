import express from 'express';
import http from 'http';
import connectDB from './config/connection';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index';

const startApolloServer = async () => {
  await connectDB();
  
  
  const app = express();
  const httpServer = http.createServer(app);
  
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  
  await server.start();

  
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  
  
  app.use('/graphql', 
    expressMiddleware(server, {
      context: async ({ req }) => ({ req })
    }) as unknown as express.RequestHandler
  );

  
  const PORT = process.env.PORT || 3001;
  await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));
  
  console.log(`API server running on port ${PORT}!`);
  console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
};


startApolloServer().catch(err => console.error('Error starting server:', err));