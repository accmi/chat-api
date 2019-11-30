import { ServerRoute } from '@hapi/hapi';
import { apiPrefix } from '../../config';
import { UserEx } from '../../controllers/user/user';

const updateUserRoute: ServerRoute = {
    method: 'POST',
    path: `${apiPrefix}update-user`,
    handler: UserEx.update,
};

const getUserRoute: ServerRoute = {
    method: 'GET',
    path: `${apiPrefix}get-user`,
    handler: UserEx.get
};

const createUserRoute: ServerRoute = {
    method: 'POST',
    path: `${apiPrefix}create-user`,
    handler: UserEx.create
};

export const userRoutes: ServerRoute[] = [
    updateUserRoute,
    getUserRoute,
    createUserRoute,
];
