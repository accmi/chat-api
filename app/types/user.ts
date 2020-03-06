import { ResponseType } from '@types';

export namespace UserTypes {
    export interface UserType {
        id?: string;
        password?: string;
        name?: string;
        login?: string;
    }
    
    export enum UserRoutes {
        create = '/user',
        login = '/login',
    }

    export enum UserErrorMessages {
        wrongPassword = 'Password is wrong',
        notFound = 'The user with this login does not exist',
    }
    
    export interface MutationUserType extends ResponseType {}
}