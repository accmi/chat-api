export interface UserType {
    id?: string;
    password?: string;
    name?: string;
    login?: string;
}

export enum UserRoutes {
    create = '/user',
}
