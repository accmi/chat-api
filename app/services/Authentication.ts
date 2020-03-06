import { Request, Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';
import { logger } from '../logger';

import { ErrorResponseType } from '@types';

class Auth {
    getTokens(login: string) {
        try {
            const secret = process.env.SECRET || 'SECRET';
            const refreshSecret = process.env.REFRESH_SECRET || 'REFRESH_SECRET';
    
            const token = JWT.sign({ login }, secret, { expiresIn: '1m' });
            const refreshToken = JWT.sign({ login }, refreshSecret, { expiresIn: '1d' });
    
            return {
                token,
                refreshToken,
            }
        } catch (error) {
            return error;
        }
    }

    checkToken(token: string) {
        const sercet = process.env.SECRET || 'SECRET';

        try {
            return JWT.verify(token, sercet);
        } catch(error) {
            return error;
        }
    }
};

export const Authentication = new Auth();
