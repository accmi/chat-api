import { ServerRoute } from '@hapi/hapi';
import { apiPrefix } from '../../config';
import { UserEx } from '../../controllers/user/user';

const updateUserRoute: ServerRoute = {
    method: 'POST',
    path: `${apiPrefix}update-user`,
    handler: UserEx.update,
};

const getUsersRoute: ServerRoute = {
    method: 'GET',
    path: `${apiPrefix}get-users`,
    handler: UserEx.getUsers
};

const createUserRoute: ServerRoute = {
    method: 'POST',
    path: `${apiPrefix}create-user`,
    handler: UserEx.create
};

const deleteUserRoute: ServerRoute = {
    method: 'POST',
    path: `${apiPrefix}delete-user`,
    handler: UserEx.delete
};

export const userRoutes: ServerRoute[] = [
    updateUserRoute,
    getUsersRoute,
    createUserRoute,
    deleteUserRoute,
];
