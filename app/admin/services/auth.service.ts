import { IAuthenticateRequest, IAuthenticateResponse } from '../../../shared/contracts/authenticate';

export interface IAuthService {
    isAuthenticated(): boolean;
    login(username: string, password: string): ng.IPromise<{}>
    logout(): ng.IPromise<{}>
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

    private loadUserCredentials() {
        var token = window.localStorage.getItem(AuthService.LOCAL_TOKEN_KEY);
        if (token) {
            this.useCredentials(token);
        }
    }

    private saveUserCredentials(token) {
        window.localStorage.setItem(AuthService.LOCAL_TOKEN_KEY, token);
        this.useCredentials(token);
    }

    private useCredentials(token) {
        this.authenticated = true;
        this.authToken = token;

        this.$http.defaults.headers.common.Authorization = this.authToken;
    }

    private deleteUserCredentials() {
        this.authToken = undefined;
        this.authenticated = false;
        this.$http.defaults.headers.common.Authorization = undefined;
        window.localStorage.removeItem(AuthService.LOCAL_TOKEN_KEY);
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

    login(username: string, password: string): ng.IPromise<{}> {
        return this.$q((resolve, reject) => {
            let user: IAuthenticateRequest = {
                username: username,
                password: password
            }
            this.$http.post('/api/authenticate', user)
                .then(result => {
                    let response = <IAuthenticateResponse>result.data;
                    if (response && response.success) {
                        this.saveUserCredentials(response.token)
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
}