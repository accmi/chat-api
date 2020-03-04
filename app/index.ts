require('dotenv').config();
import 'module-alias/register';

import cors from 'cors';
import express, { Express, Router, Response, NextFunction } from 'express';
import { urlencoded, json } from 'body-parser';

import { MainRouter } from '@routers';
import { HighLevelRoutes, RequestType } from '@types';
import { UserModel } from '@models';

import { logger } from './logger';
import { db } from './database/config';

const port = Number(process.env.PORT) || 9000;
const app: Express = express();
const router: Router = Router();

db.authenticate()
    .then(() => {
        logger.log({
            message: 'Database connected',
            level: 'info'
        });
        UserModel.sync();
    })
    .catch((error: Error) => {
        logger.log({
            message: 'Database connection is failed',
            level: 'error',
            error
        });
    });

app.use(cors());
app.listen(port, () => {
    logger.log({
        message: `Server stared on port: ${port}`,
        level: 'info'
    });
});

app.use(urlencoded({ extended: true }));
app.use(json());
app.use((req: RequestType, res: Response, next: NextFunction) => {
    logger.log({
        message: req.method,
        path: req.originalUrl,
        args: {
            query: req.query,
            body: req.body
        },
        operation: 'request',
        level: 'info'
    });
    return next();
});
app.use(HighLevelRoutes.api, router);

MainRouter(router, app);
