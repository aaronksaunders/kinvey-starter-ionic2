import { Authentication } from './../providers/authentication';
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'


import { Reducer, Action } from '@ngrx/store';

export const AuthActions = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILED: 'LOGIN_FAILED',
    CHECK_AUTH: 'CHECK_AUTH',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAILED: 'LOGOUT_FAILED',
    CHECK_AUTH_SUCCESS: 'CHECK_AUTH_SUCCESS',
    CHECK_AUTH_FAILED: 'CHECK_AUTH_FAILED',
    CHECK_AUTH_SUCCESS_NO_USER: 'CHECK_AUTH_SUCCESS_NO_USER'
}


export const AuthenticationReducer: any = (state = {}, action: Action) => {
    console.log(state, action)
    switch (action.type) {
        case AuthActions.LOGIN: {
            return Object.assign({}, { inProgress: true, isLoggedIn: false })
        }
        case AuthActions.LOGOUT: {
            return Object.assign({}, state, { inProgress: true, isLoggedIn: true })
        }

        case AuthActions.CHECK_AUTH_SUCCESS:
        case AuthActions.LOGIN_SUCCESS: {
            return Object.assign({}, { user: action.payload, isLoggedIn: true })
        }

        case AuthActions.CHECK_AUTH_FAILED:
        case AuthActions.LOGIN_FAILED: {
            return Object.assign({}, { error: action.payload, isLoggedIn: false })
        }


        case AuthActions.LOGOUT_FAILED: {
            return Object.assign({}, state, { error: action.payload, isLoggedIn: true })
        }

        case AuthActions.CHECK_AUTH_SUCCESS_NO_USER:
        case AuthActions.LOGOUT_SUCCESS: {
            return Object.assign({}, { user: null, isLoggedIn: false })
        }

        case AuthActions.CHECK_AUTH: {
            return Object.assign({}, { inProgress: true, isLoggedIn: false })
        }

        default:
            return state;
    }
}
