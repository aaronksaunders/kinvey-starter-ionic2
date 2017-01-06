
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
                return user;
            }).then(function onSuccess(user) {
                observer.complete();
            }).catch(function onError(error) {
                console.log(error)
                Observable.throw(error)
            });
        });
    }

    login(username: String, password: String) {

        return new Observable(observer => {
            Kinvey.User.login(username, password).then((user) => {
                this.token = user._kmd.authtoken;
                localStorage.setItem('token', this.token);
                observer.next(user);
                observer.complete();
            }).catch((error) => {
                console.log(error)
                Observable.throw(error)
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
                Observable.throw(error)
            });

        })
    }
}
