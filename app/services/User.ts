import { UserModel } from '@models';
import { UserType } from '@types';
import { Op } from 'sequelize';
import JWT from 'jsonwebtoken';
import { Authentication } from './Authentication';

export const createUser = async (user: UserType): Promise<MutationUsersType> => {
    const { login, password, name } = user;

    if (login && password && name) {
        try {
            const [user, created] = await UserModel.findOrCreate({where: { login }, defaults: { password, age }});

            if (!created) {
                return {
                    status: false,
                    error: [ErrorsMessage.isExist],
                }
            }

            return {
                status: true,
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
        error: [ErrorsMessage.uncknownError],
    };
};
