import {
    Router,
    Response,
    Request,
    NextFunction,
    Express,
} from 'express';
import { logger } from '../logger';
import { RequestType, ErrorResponseType, ErrorType, CutomError } from '@types';

class MainRouterClass {
    constructor(router: Router, app: Express) {
        app.use(this.requestLogging)
        router.use(this.checkToken);
        
        // Errors handling
        // app.use(this.notFound);
        
        router.use(this.statusDetect);
        router.use(this.errorsHandler);

        app.use(this.notFound);
    }

    requestLogging(req: Request, res: Response, next: NextFunction) {
        logger.log({
            message: req.method,
            args: {
                query: req.query,
                body: req.body
            },
            operation: 'request',
            level: 'info'
        });
        return next();
    }

    notFound(req: Request, res: Response) {
        return res.status(404).send('not found');
    }

    statusDetect(result: ErrorResponseType, req: RequestType, res: Response, next: NextFunction) {
        if (result.status) {
            return res.json(result).status(200);
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
                args: {
                    body: req.body,
                    query: req.query,
                },
                error: errorObject,
            });

            return res.json({
                status: false,
                error: errorObject,
            }).sendStatus(400);
        }

        return next();
    }

    checkToken(req: RequestType, res: Response, next: NextFunction) {
        // checking token
        return next();
    }
};

export const MainRouter = (router: Router, app: Express) => new MainRouterClass(router, app);
