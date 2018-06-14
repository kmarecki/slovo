export enum UserLevel{
    User = 1,
    Editor,
    Admin
}

export interface IUser {
    userId: number,
    authId: string,
    authStrategy: string,
    userName: string;
    password: string;
    email: string;
    userLevel: UserLevel;
}