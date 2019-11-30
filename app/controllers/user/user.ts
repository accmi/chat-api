import { Request, ResponseToolkit } from "@hapi/hapi";
import { IUser, IUserType } from "../../models/user";
import * as bcrypt from 'bcrypt';
import { UserTypes } from './user.types';
import { saltRounds } from "../../config";
type DeleteUserPayload = UserTypes.DeleteUserPayload;

export class UserController {
    public async getUsers(request: Request, h: ResponseToolkit) {
        try {
            console.log(request.headers);
            const user = await IUser.find().exec();

            return h.response(user);
        } catch (err) {
            return h.response(err).code(500);
        }
    }
    public create(request: Request, h: ResponseToolkit) {
        try {
            const payload = request.payload as IUserType;

            return bcrypt.hash(payload.password, saltRounds)
                .then(async (enycriptedHash: string) => {
                    const user = new IUser({
                        ...payload,
                        password: enycriptedHash,
                    });
                    const result = await user.save();
                    return h.response(result);
                })
                .catch((error: Error) => {
                    return h.response(error).code(500);
                });
        } catch (error) {
            return h.response(error).code(500);
        }
    }

    public update(request: Request, h: ResponseToolkit) {
        console.log(request, h);
    }

    public async delete(request: Request, h: ResponseToolkit) {
        try {
            console.log(request.payload);
            const payload = request.payload as DeleteUserPayload;
            await IUser.findByIdAndDelete(payload.id);

            return h.response({
                status: true
            });
        } catch (error) {
            return h.response(error).code(500);
        }
    }
}

export const UserEx = new UserController();
