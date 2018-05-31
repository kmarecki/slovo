import { IAuthenticateRequest, IAuthenticateResponse } from
    '../../../shared/contracts/authenticate';
import { ISignupRequest, ISignupResponse } from
    '../../../shared/contracts/signup';


export interface IAuthService {
    isAuthenticated(): boolean;
    login(username: string, password: string): ng.IPromise<{}>
    logout(): ng.IPromise<{}>
    signup(username: string, password: string, email: string): ng.IPromise<{}>
    getUserName(): string;
}

export class AuthService implements IAuthService {
    private static LOCAL_TOKEN_KEY = 'token';

    static inject = ['$http', '$q'];

    constructor(
        private $http: ng.IHttpService,
        private $q: ng.IQService) {

    }

    private authenticated = false;
    private authToken;
    private username = '';

    private loadUserCredentials() {
        var token = window.localStorage.getItem(AuthService.LOCAL_TOKEN_KEY);
        if (token) {
            this.useCredentials(token);
        }
    }

    private saveUserCredentials(username, token) {
        window.localStorage.setItem(AuthService.LOCAL_TOKEN_KEY, token);
        this.useCredentials(token);
        this.username = username;
    }

    private useCredentials(token) {
        this.authenticated = true;
        this.authToken = token;
        this.$http.defaults.headers.common.Authorization = this.authToken;
    }

    private deleteUserCredentials() {
        this.authToken = undefined;
        this.authenticated = false;
        this.username = '';
        this.$http.defaults.headers.common.Authorization = undefined;
        window.localStorage.removeItem(AuthService.LOCAL_TOKEN_KEY);
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

    login(username: string, password: string): ng.IPromise<{}> {
        return this.$q((resolve, reject) => {
            let request: IAuthenticateRequest = {
                username: username,
                password: password
            }
            this.$http.post('/api/authenticate', request)
                .then(result => {
                    let response = <IAuthenticateResponse>result.data;
                    if (response && response.success) {
                        this.saveUserCredentials(username, response.token);
                        resolve(response.msg);
                    } else {
                        reject(response.msg);
                    }
                });
        });
    }

    logout(): ng.IPromise<{}> {
        return this.$q((resolve, reject) => {
            this.deleteUserCredentials();
            resolve();
        });
    }

    signup(username: string, password: string, email: string): ng.IPromise<{}> {
        return this.$q((resolve, reject) => {
            let request: ISignupRequest = {
                username: username,
                password: password,
                email: email
            }
            this.$http.post('/api/signup', request)
                .then(result => {
                    let response = <ISignupResponse>result.data;
                    if (response && response.success) {
                        resolve(response.msg);
                    } else {
                        reject(response.msg);
                    }
                });
        });
    }

    getUserName(): string {
        return this.username;
    }
}