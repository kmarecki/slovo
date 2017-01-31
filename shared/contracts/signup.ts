export interface ISignupRequest {
    username: string;
    email: string;
    password: string;
}

export interface ISignupResponse {
    success: boolean;
    msg?: string;
}