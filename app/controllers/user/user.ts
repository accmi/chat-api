import { Request, ResponseToolkit } from "@hapi/hapi";

export class UserController {
    public get(request: Request, h: ResponseToolkit, err?: any) {
        console.log(request, h, err);

        return 'Hello!'
    }
    public create(request: Request, h: ResponseToolkit, err?: any) {
        console.log(request, h, err);
    }
    public update(request: Request, h: ResponseToolkit, err?: any) {
        console.log(request, h, err);
    }
}

export const UserEx = new UserController();
