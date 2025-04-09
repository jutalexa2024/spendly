import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
import type { Request } from 'express';

dotenv.config();

interface TokenUser {
  username: string;
  email: string;
  _id: string;
}

interface AuthContext {
  user: TokenUser | null;
}

interface RequestWithAuth extends Request {
  user?: TokenUser;
}

export const authenticateToken = ({ req }: { req: RequestWithAuth }): AuthContext => {
  let token = req.body?.token || req.query?.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop()?.trim() || '';
  }

  if (!token) {
    return { user: null };
  }

  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET_KEY || '') as { data: TokenUser };
    return { user: data };
  } catch (err) {
    console.log('Invalid token');
    return { user: null };
  }
};

export const signToken = (username: string, email: string, _id: unknown): string => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: 'UNAUTHENTICATED'
      }
    });
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
}