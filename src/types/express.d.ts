import * as express from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: jwt.JwtPayload | string; // This adds the `user` property to the Request interface
    }
  }
}