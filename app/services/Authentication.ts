import { Request, Response, NextFunction } from 'express';
import * as JWT from 'jsonwebtoken';
import { logger } from '../logger';

import { ErrorResponseType } from '@types';

class Auth {
    refreshTokens: {[key: string]: string} = {};

    getPairAndSetRefreshToken(login: string) {
        const secret = process.env.SECRET || 'SECRET';
        const refreshSecret = process.env.REFRESH_SECRET || 'REFRESH_SECRET';

        const token = JWT.sign({ login }, secret, { expiresIn: '1m' });
        const refreshToken = JWT.sign({ login }, refreshSecret, { expiresIn: '5m' });

        this.setRefreshToken(refreshToken, login);

        return {
            token,
            refreshToken,
        }
    }

    getToken(login: string) {
        const secret = process.env.SECRET || 'SECRET';

        return JWT.sign({ login }, secret, { expiresIn: '1m' });
    }

    setRefreshToken(token: string, login: string) {
        this.refreshTokens = {
            ...this.refreshTokens,
            [token]: login,
        }
    };

    checkRefreshToken(token: string, login: string) {
        const refreshToken = this.refreshTokens[token];

        return refreshToken && (refreshToken === login);
    }
};

export const Authentication = new Auth();
