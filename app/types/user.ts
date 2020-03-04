import { MutationType } from '@types';

export namespace UserTypes {
    export interface UserType {
        id?: string;
        password?: string;
        name?: string;
        login?: string;
    }
    
    export enum UserRoutes {
        create = '/user',
    }
    
    export interface MutationUserType extends MutationType {}
}