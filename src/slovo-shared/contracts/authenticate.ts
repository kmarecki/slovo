export interface IAuthenticateRequest {
    username: string;
    password: string;
}

export interface IAuthenticateResponse {
    success: boolean;
    token?: any;
    msg?: string;
}