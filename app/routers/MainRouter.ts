import {
    Router,
    Response,
    Request,
    NextFunction,
    Express,
} from 'express';
import { logger } from '../logger';
import {
    RequestType,
    ErrorResponseType,
    ErrorType,
 } from '@types';
 import { UserRouter } from '@routers';

class MainRouterClass {
    constructor(router: Router, app: Express) {
        app.use(this.notFound);
        router.use(this.checkToken);

        UserRouter(router, app);
        
        router.use(this.statusDetect);
        router.use(this.errorsHandler);
    }

    notFound(req: Request, res: Response) {
        return res.status(404).send('not found');
    }

    statusDetect(result: ErrorResponseType, req: RequestType, res: Response, next: NextFunction) {
        if (result.status) {
            return res.status(200).json(result);
        }

        return next(result);
    }

    errorsHandler(err: ErrorType | any, req: Request, res: Response, next: NextFunction) {
        if (err.error) {
            const isSequilize = err.error.status;
            const isDetails = err.error.details;

            const errorObject = isSequilize && err.error
                || isDetails && err.error.details.map((detail: Error) => detail.message)
                || err.error

            logger.log({
                message: req.method,
                level: 'error',
                path: req.originalUrl,
                args: {
                    body: req.body,
                    query: req.query,
                },
                error: errorObject,
            });

            return res.status(400).json({
                status: false,
                error: errorObject,
            });
        }

        return next();
    }

    checkToken(req: RequestType, res: Response, next: NextFunction) {
        // checking token
        return next();
    }
};

export const MainRouter = (router: Router, app: Express) => new MainRouterClass(router, app);
