import { hashSync, genSaltSync } from 'bcryptjs';
import { UserModel } from '@models';
import { UserTypes, GlobalErrorsMessage } from '@types';
import { Authentication } from '@services';

import UserType = UserTypes.UserType;
import MutationUserType = UserTypes.MutationUserType;

export const createUser = async (user: UserType): Promise<MutationUserType> => {
    const { login, password, name } = user;

    if (login && password && name) {
        try {
            const salt = genSaltSync(10);
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

            const { token, refreshToken } = Authentication.getPairAndSetRefreshToken(user.logn);

            return {
                status: true,
                tokens: {
                    token,
                    refreshToken,
                }
            };
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
