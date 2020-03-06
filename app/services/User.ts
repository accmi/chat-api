import fetch from 'node-fetch';
import { hashSync, genSaltSync, compareSync } from 'bcryptjs';
import { UserModel } from '@models';
import { UserTypes, GlobalErrorsMessage, ResponseType } from '@types';
import { Authentication } from '@services';

import UserType = UserTypes.UserType;
import MutationUserType = UserTypes.MutationUserType;
import UserErrorMessages = UserTypes.UserErrorMessages;

export const createUser = async (user: UserType): Promise<MutationUserType> => {
    const { login, password, name } = user;

    if (login && password && name) {
        try {
            const SALT = Number(process.env.SALT) || 10;
            const salt = genSaltSync(SALT);
            const hash = hashSync(password, salt);            
            const [user, created] = await UserModel.findOrCreate({
                where: {
                    login,
                },
                defaults: {
                    password: hash,
                    name,
                }});

            if (!created) {
                return {
                    status: false,
                    error: [GlobalErrorsMessage.isExist],
                }
            }

            const { token, refreshToken } = Authentication.getTokens(user.logn);
            const authUrl = process.env.AUTH_URL || 'http://localhost:2000';
            try {
                const result = await fetch(`${authUrl}/api/user`, {
                    method: 'POST',
                    body: JSON.stringify({
                        token: refreshToken,
                        login,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                });
    
                const { status, token: newRefreshToken, error } = await result.json();

                if (status) {
                    return {
                        status: true,
                        tokens: {
                            token,
                            refreshToken,
                        }
                    };
                }

                return {
                    status: false,
                    error,
                }
            } catch(error) {
                return {
                    status: false,
                    error,
                };
            }
        } catch (error) {
            return {
                status: false,
                error,
            };
        }
    }

    return {
        status: false,
        error: [GlobalErrorsMessage.uncknownError],
    };
};

export const loginUser = async (user: UserType): Promise<ResponseType> => {
    const { login, password } = user;

    if (login && password) {
        const { password: hash } = await UserModel.findOne({
            where: { login }
        });

        if (hash) {
            const isCorrected = compareSync(password, hash);

            if (isCorrected) {
                const { token, refreshToken } = Authentication.getTokens(login);

                return {
                    status: true,
                    tokens: {
                        token,
                        refreshToken,
                    }
                }
            }

            return {
                status: false,
                error: [UserErrorMessages.wrongPassword],
            }
        }

        return {
            status: false,
            error: [UserErrorMessages.notFound],
        }
    }

    return {
        status: false,
        error: [GlobalErrorsMessage.uncknownError],
    };
}
