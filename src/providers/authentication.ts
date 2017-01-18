
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { appKey, secretKey } from './config';

declare var Kinvey: any

@Injectable()
export class Authentication {
    token: string;

    constructor(public http: Http) {
        Kinvey.initialize({
            appKey: appKey,
            appSecret: secretKey
        }).then((activeUser) => {
            // ...
            console.log(` the active user is ${activeUser}`)

            if (activeUser) {
                this.token = activeUser._kmd.authtoken;
                localStorage.setItem('token', this.token);
            } else {
                this.token = undefined;
                localStorage.removeItem('token');
            }

        }).catch(function (error) {
            // ...
        })
        this.token = localStorage.getItem('token');
    }

    checkActiveUser() {
        return new Observable(observer => {
            setTimeout(() => {
                let activeUser = Kinvey.User.getActiveUser()
                var promise = Promise.resolve(activeUser);
                if (activeUser !== null) {
                    promise = activeUser.me();
                }

                promise.then((user) => {
                    observer.next(user);
                    observer.complete();
                }).catch(function (error) {
                    console.log("checkActveUser", error)
                    observer.error(error);
                });
            }, 1000);
        });

    }

    createUser(userInfo) {
        let params = JSON.stringify({
            username: userInfo.username,
            password: userInfo.password,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name
        });

        var user = new Kinvey.User();
        return new Observable(observer => {
            user.signup(params).then((user) => {
                localStorage.setItem('newUser', JSON.stringify(user.toJSON()));
                this.token = user._kmd.authtoken;
                localStorage.setItem('token', this.token);
                observer.next(user);
                observer.complete();
            }).catch((error) => {
                console.log("createUser", error)
                observer.error(error);
            });
        });
    }

    login(_params) {

        return new Observable(observer => {
            Kinvey.User.login(_params.username, _params.password).then((user) => {
                this.token = user._kmd.authtoken;
                localStorage.setItem('token', this.token);
                observer.next(user);
                observer.complete();
            }).catch((error) => {
                console.log(error)
                observer.error(error);
            });

        })
    };

    logout() {
        return new Observable(observer => {
            Kinvey.User.logout().then((user) => {

                // clean up the token
                this.token = undefined;
                localStorage.removeItem('token');

                observer.next();
                observer.complete();
            }).catch((error) => {
                console.log(error)
                observer.error(error);
            });

        })
    }
}
