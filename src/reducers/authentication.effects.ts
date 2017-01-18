import { AuthActions } from './authentication';
import { Authentication } from './../providers/authentication';
import { Injectable } from '@angular/core'

import { Reducer, Action } from '@ngrx/store';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthEffects {
    constructor(
        private auth: Authentication,
        private actions$: Actions
    ) { }


    @Effect() kinveyInit$ = this.actions$
        // Listen for the 'LOGIN' action
        .ofType(AuthActions.INIT_KINVEY)
        // Map the payload into JSON to use as the request body
        //.map(action => JSON.stringify(action.payload))
        .switchMap(action => this.auth.initKinvey()
            // If successful, dispatch success action with result
            .map((res: any) =>{
                if (res) {
                    return { type: AuthActions.INIT_KINVEY_SUCCESS, payload: res.data }
                } else {
                    return { type: AuthActions.INIT_KINVEY_SUCCESS_NO_USER }
                }
            }) //({ type: AuthActions.INIT_KINVEY_SUCCESS, payload: res }))
            // If request fails, dispatch failed action
            .catch((res: any) => Observable.of({ type: AuthActions.INIT_KINVEY_FAILED, payload: res }))
        );


    @Effect() login$ = this.actions$
        // Listen for the 'LOGIN' action
        .ofType(AuthActions.LOGIN)
        // Map the payload into JSON to use as the request body
        //.map(action => JSON.stringify(action.payload))
        .switchMap(action => this.auth.login(action.payload)
            // If successful, dispatch success action with result
            .map((res: any) => ({ type: AuthActions.LOGIN_SUCCESS, payload: res.data }))
            // If request fails, dispatch failed action
            .catch((res: any) => Observable.of({ type: AuthActions.LOGIN_FAILED, payload: res }))
        );

    @Effect() logout$ = this.actions$
        // Listen for the 'LOGOUT' action
        .ofType(AuthActions.LOGOUT)
        .switchMap(action => this.auth.logout()
            // If successful, dispatch success action with result
            .map((res: any) => ({ type: AuthActions.LOGOUT_SUCCESS, payload: res }))
            // If request fails, dispatch failed action
            .catch((res: any) => Observable.of({ type: AuthActions.LOGOUT_FAILED, payload: res }))
        );

    @Effect() checkAuth$ = this.actions$
        // Listen for the 'CHECK_AUTH' action
        .ofType(AuthActions.CHECK_AUTH)
        // Map the payload into JSON to use as the request body
        //.map(action => JSON.stringify(action.payload))
        .switchMap(action => this.auth.checkActiveUser()
            // If successful, dispatch success action with result
            .map((res: any) => {
                if (res) {
                    return { type: AuthActions.CHECK_AUTH_SUCCESS, payload: res.data }
                } else {
                    return { type: AuthActions.CHECK_AUTH_SUCCESS_NO_USER }
                }
            })
            // If request fails, dispatch failed action
            .catch((res: any) => Observable.of({ type: AuthActions.CHECK_AUTH_FAILED, payload: res }))
        );
}
