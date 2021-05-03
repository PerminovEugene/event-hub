import { sign, verify } from 'jsonwebtoken';

export const parseJWT = (accessToken: string): { userId: number } => {
  return verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as any;
}

export const createAccessTokenJWT = (payload: any): string => {
  return sign(payload, process.env.ACCESS_TOKEN_SECRET);
}