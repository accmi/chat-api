import {
    Router,
    Response,
    NextFunction,
    Express,
} from 'express';
import { createValidator } from 'express-joi-validation';
import { UserTypes, RequestType } from '@types';
import { userCreateScheme } from '@validators';
import { createUser } from '@services';

import UserRoutes = UserTypes.UserRoutes;
import UserType = UserTypes.UserType;

const validator = createValidator({
    passError: true,
});

class UserRouterClass {
    constructor(router: Router, app: Express) {
        router.post(UserRoutes.create, validator.body(userCreateScheme), this.createUser);
    }

    async createUser(req: RequestType<UserType>, res: Response, next: NextFunction) {
        const result = await createUser(req.body);

        next(result);
    }
}

export const UserRouter = (router: Router, app: Express) => new UserRouterClass(router, app);
